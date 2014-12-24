console.log("JUnit Model Reporter Test....");
var tmr,
    fs,
    jmrOnReady;

// TODO check what tests should count...
function generateTest(tmr, type) {

    function _junitTest() {

        var obj = tmr.generate({
            type: "model.testsuites",
            data: {
                disabled: "false",
                name: "test.suites.1",
                body: [
                    {
                        type: "model.testsuite",
                        data: {
                            id: "$2",
                            package: "test.test",
                            name: "test.suite.1",
                            body: [
                                {
                                    type: "model.testcase",
                                    data: {
                                        classname: "class1",
                                        name: "test.case",
                                        time: "now",
                                        body: [
                                            {
                                                type: "model.failure",
                                                data: {
                                                    type: "fail"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });


        var testfile = "./tests/test1.xml";
        console.log("model: ", obj.model);
        console.log("out: ", obj.output);

        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {

                if (fs.existsSync(testfile)) {
                    fs.unlinkSync(testfile);
                }
                tmr.write(testfile, obj.output);
            }
        }
    }
    
    if (type == "junit") {
        _junitTest();
    }
}

function junitAPITest(tmr) {

    var testsuite = tmr.create({
        type: "model.testsuite",
        data: {
            name: "testsuite"
        }
    });
    var testcase = tmr.create({
        type: "model.testcase",
        data: {
            time: "now"
        }
    });
    testcase.set("name", "This is the test name");

    var failure = tmr.create({
        type: "model.failure",
        data: {
            message: "This is a faulire message",
            type: "SomeAssertionBal"
        }
    });

    testcase.add(failure);
    testsuite.add(testcase);

    var testfile = "./tests/test2Test.xml",
        out = testsuite.compile();
    console.log("model: ", testsuite);
    console.log("out: ", out);

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {

            if (fs.existsSync(testfile)) {
                fs.unlinkSync(testfile);
            }
            tmr.write(testfile, out);

            // validate the report agains the junit xsd
            console.log("\nValidating report, the report is: " + (tmr.validate(out) ? "valid" : "not valid"));

            tmr.report({
                reportsdir: "tests/reports",
                testsdir: "tests"
            });
        }
    }
}


function jasmineAPITest(tmr) {

    tmr.setReporter( "jasmine");
    
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
   
    
    var testfile = "./tests/specs/testSpec.js",
        out = describe.compile();
    
    console.log("model: ", describe);
    console.log("out: ", out);

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {

            if (fs.existsSync(testfile)) {
                fs.unlinkSync(testfile);
            }
            tmr.write(testfile, out);

            // validate the report agains the junit xsd
            console.log("\nValidating report, the report is: " + (tmr.validate(out) ? "valid" : "not valid"));

            require('package-script').spawn([
                {
                    command: "jasmine-node",
                    args: ["./tests/specs"]
                }
            ]);
         
        }
    }
}


(function () {


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            // nodejs support

            var testfolder = "./tests";

            tmr = require('./../jmr.js');
            fs = require("fs");

            if (!fs.existsSync(testfolder)) {
                fs.mkdirSync(testfolder);
            }
            if (!fs.existsSync(testfolder + "/specs")) {
                fs.mkdirSync(testfolder + "/specs");
            }

            console.log("\n\n** JUnit Tests ************");
            console.log("** [JUnit] API Test ************");
            junitAPITest(tmr);

            console.log("\n\n** Generate by configuration Test ************");
            generateTest(tmr);

            console.log("\n\n** Jasmine Tests ************");
            console.log("** [Jasmine] API Test ************");
            jasmineAPITest(tmr);

        }
    } else {

        function browserCall(jmr) {

            console.log("\n\n** JUnit Tests ************");
            console.log("** [JUnit] API Test ************");
            junitAPITest(jmr);

            console.log("\n\n** [JUnit] Generate by configuration Test ************");
            generateTest(jmr, "junit");
           
            // Note:!! no jasmine for the web just yet
        }

        if (typeof require != "undefined") {
            define([], function () {
                var jmrOnReady = function (jmr) {
                    browserCall(jmr);
                };
                return {jmrOnReady: jmrOnReady};

            });

        } else {
            browserCall(testModelReporter);
            browserCall(jmr);
        }

    }


})();