'use strict';

// TO DO write our own parser
const parser = require('logic-query-parser');

module.exports = (query, macro_regex) => {
    const binaryTree = parser.parse(query);
    query = parser.utils.binaryTreeToQueryJson(binaryTree);
    const parse_macros = (values, next) => {
        values.forEach((element, index) => {
            if (element.type === "string") {
                let match = element.value.match(macro_regex);
                if (match) {
                    element.type = match[1];
                    if (match[2]) {
                        element.operator = match[2];
                    }
                    if (values[index + 1]) {
                        element.value = values[index + 1].value;
                        values.splice(index + 1, 1);
                        if (element.operator === "..") {
                            element.value += element.operator + values[index + 1].value;
                            values.splice(index + 1, 1);
                        }
                    }
                } else {
                    element.type = "word";
                }
            } else if (element.values) {
                element.values = parse_macros(element.values);
                const is_value_a_macro = macro_regex.test(element.values[0].value);
                const is_type_a_macro = macro_regex.test(element.values[0].type + ":");
                if (element.values.length === 1 && (is_type_a_macro || is_value_a_macro)) {
                    const macros = parse_macros(element.values);
                    if (is_value_a_macro && values[index+1]) {
                        const new_value = values[index+1].value;
                        macros[0].value = new_value;
                        element.values = macros;
                        values.splice(index+1, 1)
                        values[index] = element;
                    } else if (is_type_a_macro && element.type === "and") {
                        const new_values = element.values[0];
                        values[index] = new_values;
                    }
                }
            }
        });
        return values;
    };
    if (query.err) {
        throw query.err;
    }
    if (query.values) {
        query.values =  parse_macros(query.values);
        if (query.values.length === 1) {
            query = query.values[0];
        }
    }
    if (query.type === "string") {
        query.type = "word";
    }
    return query;
};
