Test Unit Reporter
=====================

<p>
Create a pure JavaScript object mode based on JUnit methodology and produce a report based on that model.<br/>
This module can be easily extended to any report style you need.<br/>
Currently this module supports JUnit xml reporter including:
* validation against junit.xsd
* Report utility that generates a local HTML report for you to validate before it gets to the e.g. Jenkins
</p>

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
                type: "SomeAssertionBal"
            }
        });

### With that :
You can validate your model against the XSD file:

    // compile the model to an output
    var output = testsuite.compile();
    // validate the output against the XSD file
    jmr.validate(out)

### And then
You can create an HTML site using Ant Reporter.

    // write your file to the tests folder
    jmr.write("./tests/demoTest.xml", testsuite.compile());

    // tell ant where are your tests and where to put your HTML output
    // Ant will collect all your *Test.xml files from test folder
    jmr.report({
            reportsdir:"tests/reports",
            testsdir: "tests"
        });}

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

<p>Validate the report (if supported by the reporter)</p>
* validate(report)
    + report {String} The generated output mode

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


#### Contribute
This package can be extended to support additional reporters.

* Create a folder name based on your reporter name e.g. ./src/reporter/dot
* Create a templates folder below your reporter root folder
* With Mustache syntax create your templates including the incoming data
* Implement Reporter.js class
    + implement validate method (optional)
    + implement report method (optional)

See ./src/reporter/junit reporter for more information