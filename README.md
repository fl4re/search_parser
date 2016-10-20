# Search parser

This is a search parser for query syntax comprising of macros and logic operators.

## Installation

```npm install http://github.com/fl4re/search_parser```

## Usage

```javascript
const search_parser = require("search_parser");
//macro regular expression to catch specific keywords and eventual operators
const macro_regex = /^(kind|mime|created|modified|extension|size|depth):(<=?|>=?|\.\.)?$/;
const query_string = 'test AND query OR "hello word" kind: file';

var query_json = search_parser(query_string, macro_regex);
```

## Test

```npm test```

Check programms are based on mocha and should npm modules.

## License

The MIT License (MIT)
