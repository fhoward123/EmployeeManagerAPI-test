//require('babel-register')() // or require('babel-core/register')
require('babel-core/register')

const properties = require('./nightwatch.props')

module.exports = {
    "src_folders"       : "tests",
    "page_objects_path" : "pageObjects", 
    "selenium" : {
        "start_process" : true,
        "server_path" : properties.resourcePath + properties.seleniumServer,
        "log_path" : "",
        "port" : 4445,
        "cli_args" : {
            "webdriver.chrome.driver" : properties.resourcePath + properties.chromedriver,
            "webdriver.gecko.driver" : properties.resourcePath + properties.geckodriver,
            "webdriver.ie.driver" : properties.resourcePath + properties.iedriver,
            "webdriver.edge.driver" : properties.resourcePath + properties.edgedriver,
            "webdriver.opera.driver" : properties.resourcePath + properties.operadriver,
        }
    },
 
    "test_settings" : {
        "test_workers" : true,
        "default" : {
            "launch_url"    : "http://localhost",
            "selenium_port" : 4445,
            "selenium_host" : "localhost",
            "silent"        : true,
            "screenshots" : {
                "enabled" : false,
                "path" : ""
            },
            "skip_testcases_on_fail": false,
            "desiredCapabilities": {
                "browserName": "chrome",
            }
        },
 
        "firefox" : {
            "desiredCapabilities": {
                "browserName" : "firefox",
                "marionette"  : true
            }
        },

        "opera" : {
            "desiredCapabilities": {
                "browserName": "opera",
            }
        },
 
        "edge" : {
            "desiredCapabilities" : {
                "browserName" : "MicrosoftEdge"
            }
        }
    }
}
