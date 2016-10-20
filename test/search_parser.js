'use strict';
require('should');
const search_parser = require('../index');
const ifs_output = require("./ifs_output.json");

const ifs_search_parser = query => search_parser(query, /^(kind|mime|created|modified|extension|size|depth):(<=?|>=?|\.\.)?$/);

describe('Ifs search parser', () => {
    ifs_output.forEach((test_object, index) => {
        it("#Test n°"+ (index+1), done => {
            const output = ifs_search_parser(test_object.query);
            output.should.deepEqual(test_object.output);
            done();
        });
    });
});