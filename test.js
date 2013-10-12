console.log("JUnit Model Reporter Test....");
var tmr,
    fs;

// TODO check what tests should count...
function generateTest(tmr) {

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
                                                type: "fail",
                                                body: "erwerwe"
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

    if (fs.existsSync()) {
        fs.unlinkSync(testfile);
    }
    tmr.write(testfile, obj.output);

    // validate the report agains the junit xsd
    console.log("\nValidating report, the report is: " + (tmr.validate(obj.output) ? "valid" : "not valid"));

}

function apiTest() {

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

    if (fs.existsSync()) {
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

(function () {


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            // nodejs support

            var testfolder = "./tests";

            tmr = require('./tmr.js');
            fs = require("fs");

            if (!fs.existsSync(testfolder)) {
                fs.mkdirSync(testfolder);
            }

            console.log("\n\n** API Test ************");
            apiTest();

            console.log("\n\n** Generate by configuration Test ************");
            generateTest(tmr);

        }
    } else {
//        require(["jmr"], function (jmr) {
//            console.log("\n\n** Generate by configuration Test ************");

            jmrOnReady = function(jmr) {
                debugger;
                generateTest(jmr);
            };

//        });
    }


})();