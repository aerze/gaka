'use strict';


var body = document.body;
var testDiv = Render.div({id: 'test'});
var template = document.getElementById('temp');
testDiv.addTo(body);
var start, end;

function avg(array) {
    var total = 0;
    for (var i = array.length - 1; i >= 0; i--) {
        if (Array.isArray(array[i])) {
            for (var j = array[i].length - 1; j >= 0; j--) {
                total += array[i][j];
            }
        }
        total += array[i];
    }
    return (total/array.length);
}


function test (number, testFunc) {

    var testArray = [];

    console.groupCollapsed('Group ' + number);
    for (var i = 0; i <= 20; i++) {
        start = window.performance.now();
        

        testFunc(testDiv);
        

        end = window.performance.now();
        testArray.push(end-start);
        console.groupCollapsed('Test ' + i + ': ' + (end - start) );
            console.log('> ' +start);
            console.log('< ' +end);
        console.groupEnd('Test ' + i);
    }
    console.groupEnd('Group ' + number);
    console.log('\t avg:' + avg(testArray));

    return testArray;
}

function run (func, name) {
    var groupArray = [];
    console.log('Running: ' + name);
    console.groupCollapsed(name);
    for (var i = 0; i <= 10; i++) {
        testDiv.innerHTML = '';
        groupArray.push(test(i, func));
    }
    console.groupEnd(name);
    console.log('\t avg:' + avg(groupArray));
}





function testInnerHTML(div) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = template.innerHTML;
    div.appendChild(newDiv);
}

run(testInnerHTML, 'innerHTML');