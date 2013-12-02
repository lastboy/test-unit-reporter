Test Model Reporter
=====================

Create a pure JavaScript object mode based on JUnit methodology and produce a report based on that model.<br/>
This module can be easily extended to any report style you need.<br/>
Currently this module supports JUnit xml reporter including:

* Report utility that generates a local HTML report for you to validate before it gets to the e.g. Jenkins


## How To
The JUnit classes are available with their properties according to the junit.xsd


### First create a simple model
The model can be crated using an API like so:

     var testcase,
        failure,
        testsuite = jmr.create({
            type: "model.testsuite",
            data: {
                name: "testsuite"
            }
        });
        testcase = jmr.create({
            type: "model.testcase",
            data: {
                time: "now"
            }
        });
        testcase.set("name", "This is the test name");

        failure = jmr.create({
            type: "model.failure",
            data: {
                message: "This is a faulire message",
                type: "failure"
            }
        });

        testcase.add(failure);
        testsuite.add(testcase);


### With that:

You can create an HTML site using Ant Reporter.

    // write your file to the tests folder
    jmr.write("./tests/demoTest.xml", testsuite.compile());

    // tell ant where are your tests and where to put your HTML output
    // Ant will collect all your *Test.xml files from test folder
    jmr.report({
            reportsdir: "tests/reports",
            testsdir: "tests"
        });


### Another example
In case you generates an object with all of your data, much simpler to burst it like so:

    var obj = jmr.generate({
        type: "model.testsuites",
        data: {
            disabled: "false",
            name: "test.suites",
            body: [{
                type: "model.testsuite",
                data: {
                    id: "$id",
                    package: "test.test",
                    name: "test.suite.1",
                    body: [{
                        type: "model.testcase",
                        data: {
                            classname: "class1",
                            name: "test.case",
                            time: "now",
                            body: [{
                                type: "model.failure",
                                data: {
                                    type: "fail",
                                    body: "body content in here..."
                                }
                            }]
                        }
                    }]
                }
            }]
        }
    });


## Versions

### 0.0.7
Report validation API is obsolete, the libxmljs dependency has been removed.
In case you still wish to do some sort of validation @see NPM js.utils XML module

### 0.0.4
RequireJS dependency removed.

* download the browser version
    + with NO dependencies: [tmr-min.js](https://raw.github.com/lastboy/test-unit-reporter/master/target/tmr-min.js)
        + manually download
            + [Underscore](http://underscorejs.org/)
            + [Typedas](https://raw.github.com/alexduloz/typedAs/gh-pages/typedAs.js)
            + [jsutils-min.js](https://raw.github.com/lastboy/js.utils/master/target/jsutils-min.js)

    + with dependencies: [tmr-min-all.js](https://raw.github.com/lastboy/test-unit-reporter/master/target/tmr-min-all.js)
        + typedas, underscore and js.utils are already inside

* Usage
    + test-model-reporter global variables for the web:
        + jmr || testModelReporter;

* Ant reporter, issue with MAC
    + After Ant Npm installed edit the ../bin/ant file according to the [following fix](https://issues.apache.org/bugzilla/show_bug.cgi?id=52632)

### 0.0.3
Support for a none AMD browser version.

* download browser version with NO dependency, download: [tmr-min.js](https://raw.github.com/lastboy/test-model-reporter/master/tmr-min.js)
    + Just use 'jmr' as global variable

* download browser version with require dependency, download: [tmr-require-min.js](https://raw.github.com/lastboy/test-model-reporter/master/tmr-require-min.js)
    + Still need to use 'jmrOnReady' Listener as described below


### 0.0.2

Support for the browser version,
Download: [tmr-require-min.js](https://raw.github.com/lastboy/test-model-reporter/master/tmr-require-min.js)

Assign a ready event:

    jmrOnReady = function(tmr){
    };


## Reference

<br/>
<p>Create a specific entity according to a given configuration</p>

* create(config)
    + config {Object} The JUnit based configuration model
        + type - The type of the class model.[testsuites | testsuite | testcase | failure | error | skipped | system]
        + data - The class data
            + available specification properties (id, name, disabled, etc...)
            + body - the class children, can be a nested class or a string value


<p>Generate an object model according to a given configuration</p>

* generate(config)
    + config {Object} The JUnit based configuration model
        + type - The type of the class model.[testsuites | testsuite | testcase | failure | error | skipped | system]
        + data - The class data
            + available specification properties (id, name, disabled, etc...)
            + body - the class children, can be a nested class or a string value
 return an object
    + output {String} The generate output model
    + model {Object} The generated object model

<p>Generate a report (if supported by the reporter)</p>
* report(config)
    + config {Object} The configuration to be passed to the reporter

  JUnit Reporter configuration {reportsdir: "the output report location", testsdir: "the test folder to be scanned"}


<p>Write your data to a file</p>
* write(file, data)
    + file {String} The file
    + data {String} The file content


<p>Set the reporter type</p>
* setReporter(key)
    + key {String} The key name of the reporter (currently "junit" (default) supported only)


## Contribute

<p>This package can be extended to support additional reporters.</p>
* Create a folder name based on your reporter name e.g. ./src/reporter/dot
* Create a templates folder below your reporter root folder
* With Mustache syntax create your templates including the incoming data
* Implement Reporter.js class
    + implement report method (optional)


See ./src/reporter/junit reporter for more information
