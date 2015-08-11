'use strict';

var htmlparser = require('htmlparser2');
var fs = require('fs');

var html = fs.readFileSync('public/element_test.html', {encoding: 'utf8'});

var output = '';
var isOpen = false;
var nest = 0;
var cacheText = [];


var parser = new htmlparser.Parser({
onopentag: function (name,  attributes) {
    if (isOpen) {
        nest += 1;
    }
    switch (name) {
        case 'h1':
        output += '\narray.push(Render.h1({';
        isOpen = true;
        break;

        case 'h2':
        output += '\narray.push(Render.h2({';
        isOpen = true;
        break;

        case 'p':
        output += '\narray.push(Render.p({';
            isOpen = true;
        break;
    }

},
onopentagname: function (name) {
    switch (name) {
        case 'hr':
        output += '\narray.push(Render.hr({}));';
    }
},
onattribute: function (name,  value) {

},
ontext: function (text) {
    if (isOpen) {
        output += 'text: \'' + text + '\'';
    }
},
onclosetag: function (name) {
    switch (name) {
        case 'h1':
        output += '}));';
        isOpen = false;
        break;

        case 'h2':
        output += '}));';
        isOpen = false;
        break;

        case 'p':
        output += '}));';
        isOpen = false;
        break;
    }
},
onprocessinginstruction: function (name,  data) {

},
oncomment: function (data) {

},
oncommentend: function () {

},
oncdatastart: function () {

},
oncdataend: function () {

},
onerror: function (error) {

},
onreset: function () {

},
onend: function () {
    output = '(function () {\nvar array = [];\n\n' + output;
    output += '\n\n'+
        'for (var i = 0; i <= array.length - 1; i++) {\n'+
        'array[i].addTo(document.body);\n'+
        '};';
    output += '\n})();';
},
});

parser.write(html);
parser.end();
console.log(output);