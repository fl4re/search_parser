# Search parser

This is a search parser for query syntax comprising of macros and logic operators. 
It aims to support what is specified in this [document](https://docs.google.com/document/d/1jca1EKI4C13PzzjfIEMZ9-zPy0Uiv4MH7PjuSHm1pXg/edit)

## Installation

```npm install @sb/search_parser```

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
