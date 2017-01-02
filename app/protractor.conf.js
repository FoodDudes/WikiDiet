exports.config = {

    allScriptsTimeout: 11000,

    // list of file globs
    specs: [
        'test-e2e/**/*.js'
    ],

    // OR, define suites:

    // suites: {
    //     home: 'test-e2e/home.test.js',
    //     full: 'test-e2e/**/*.test.js'
    // },

    capabilities: {
        browserName: 'chrome'
    },
    
    // if you don't specify this, it will start one for you
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://localhost:8080',

    framework: 'jasmine',

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print: function() {}
    }
};