console.log("JUnit Model Reporter Test....");
var jmr = require('./jmr.js');

// TODO check what tests should count...
function generateTest() {
    var obj = jmr.generate({
        type: "model.testsuites",
        data: {
            disabled: "false",
            body: [{
                type: "model.testsuite",
                data: {
                    id: "$2",
                    body: [{
                        type: "model.testcase",
                        data: {
                            time: "now",
                            body: [{
                                type: "model.failure",
                                data: {
                                    message: "This is a faulire message",
                                    type: "SomeAssertionBal"
                                }
                            },{
                                type: "model.failure",
                                data: {
                                    message: "This is a faulire message",
                                    type: "SomeAssertionBal"
                                }
                            }]
                        }
                    }]
                }
            }]
        }
    });

    console.log("model: ", obj.model);
    console.log("out: ", obj.output);
}

function apiTest() {

    var testcase = jmr.create({
        type: "model.testcase",
        data: {
            time: "now"
        }
    });
    testcase.set("name", "This is the test name");

    var failure = jmr.create({
        type: "model.failure",
        data: {
            message: "This is a faulire message",
            type: "SomeAssertionBal"
        }
    });

    testcase.add(failure);
    testcase.add(failure);

    console.log("Class: ", testcase);
    console.log(" ... ");
    console.log("xml output: ", testcase.compile());
}

(function() {

    console.log("\n\n** API Test ************");
    apiTest();

    console.log("\n\n** Generate by configuration Test ************");
    generateTest()

})();