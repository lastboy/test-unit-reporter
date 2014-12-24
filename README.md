Test Model Reporter
=====================

JavaScript hierarchical object model<br/>
Any model type can validate, generate a report and write it to the file system<br/>
Currently JUnit xml and Jasmine reporters are supported:
* **JUnit** Generates JUnit XML files according to the junit.xsd
* **Jasmine** Generates spec files 

## How To

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

**Note: Ant dependency is not installed. You can find it in the dev dependency section.**


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


### Jasmine example

    var describe = tmr.create({
        type: "model.jas.describe",
        data: {
            title: "A suite is just a function",
            body:[
                {
                    type:"model.jas.code",
                    data: {
                        body: "var a;"
                    }
                },
                {
                    type: "model.jas.it",
                    data: {
                        title: "and so is a spec",
                        body: [{
                            type:"model.jas.code",
                            data: {
                                body: "a = true; expect(a).toBe(true);"
                            }
                        }]
                    }
                }
            ]
        }
    });

## Browser Support

### Usage

* AMD

    * See tmrwebRequire-min.js file, as an example of requirejs project style
    
        define([], function() {

            var jmrOnReady = function (jmr) {
                // use the "jmr" object   
            };
            return jmrOnReady;
            
        });
           
* None AMD

        // Use "jmr" or "testModelReporter" objects 
            
            
            
### Download

* download the browser version

    + None AMD    
        + with NO dependencies: [tmr-min.js](https://raw.github.com/lastboy/test-unit-reporter/master/target/tmr-min.js)
            + manually download
                + [Underscore](http://underscorejs.org/)
                + [jsutils-min.js](https://raw.github.com/lastboy/js.utils/master/target/jsutils-min.js)    
        + with dependencies: [tmr-min-all.js](https://raw.github.com/lastboy/test-unit-reporter/master/target/tmr-min-all.js)
            + underscore and js.utils are already inside
    
    
    + AMD
        + [tmr-require-min.js](https://raw.github.com/lastboy/test-unit-reporter/master/target/tmr-require-min.js)    

## Troubleshooting
 
* Ant reporter, issue with MAC
    + After Ant Npm installed edit the ../bin/ant file according to the [following fix](https://issues.apache.org/bugzilla/show_bug.cgi?id=52632)


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


See ./src/reporter/junit and ./src/reporter/jasmine reporters for more information
