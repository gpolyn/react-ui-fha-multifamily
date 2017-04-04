//const conf = require('./gulp.conf');

exports.config = {

    /**
     * server configurations
     */
    host: '0.0.0.0',
    port: 4444,
    //staticServerPort: 4444,
    staticServerLog: true,

    /**
     * specify test files
     */
    specs: [
        './e2e/example.spec.js'
    ],
    /**
     * capabilities
     */
    capabilities: [{
        browserName: 'phantomjs'
    }
    ],

    staticServerFolders: [
      {mount: '/', path: './.tmp'} 
    ],

    /**
     * test configurations
     */
    logLevel: 'silent',
    coloredLogs: true,
    waitforTimeout: 10000,
    framework: 'jasmine',
    services: [
      'webpack',
      'phantomjs',
      'static-server'
    ],
    webpackConfig: require('./webpack.conf.js'), 
    reporters: ['dot'],
    reporterOptions: {
        outputDir: './'
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 9999999
    },

    /**
     * hooks
     */
    onPrepare: function() {
        console.log('let\'s go');
    },
    onComplete: function() {
        console.log('that\'s it');
        process.exit(); // temporary fix for inability to quit out of wdio gulp service
    }

};
