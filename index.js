'use strict';

// TO DO write our own parser
const parser = require('logic-query-parser');

module.exports = (query, macro_regex) => {
    const binaryTree = parser.parse(query);
    query = parser.utils.binaryTreeToQueryJson(binaryTree);
    const parse_macros = values => {
        values.forEach((element, index) => {
            if (element.type === "string") {
                let match = element.value.match(macro_regex);
                if (match) {
                    element.type = match[1];
                    if (match[2]) {
                        element.operator = match[2];
                    }
                    element.value = values[index + 1].value;
                    values.splice(index + 1, 1);
                    if (element.operator === "..") {
                        element.value += element.operator + values[index + 1].value;
                        values.splice(index + 1, 1);
                    }
                } else {
                    element.type = "word";
                }
            } else if (element.values) {
                element.values = parse_macros(element.values);
            }
        });
        return values;
    };
    if (query.err) {
        throw query.err;
    }
    if (query.values) {
        query.values =  parse_macros(query.values);
    }
    if (query.type === "string") {
        query.type = "word";
    }
    return query;
};