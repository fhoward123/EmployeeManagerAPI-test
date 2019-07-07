import {containsValue} from './containsValue';
import {baseUrl} from '../testAssets/baseUrl';

const XMLHttpRequest = require('xhr2');

// GET Methods
function httpGet(site, callback) {
    const request = new XMLHttpRequest()
    request.open('GET', site, true)
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(this.response)
            callback(data)
        }
        else {
            console.log(`error ${request.status}`)
            callback()
        }
    }
    request.send()
}

export function getEmployees(browser, callback) {
    let employees = []
    browser
        .perform(function(done) {
            httpGet(baseUrl, function(response) {
                if (response) {
                    employees = response
                    done()
                }
                else
                    browser.assert.ok(false, 'API GET query failed')
                done()
            })
        })
        .perform(function() {
            if (callback)
                callback(employees)
            return employees
        })
}

// DELETE Methods
function httpDelete(site, id, callback) {
    const request = new XMLHttpRequest()
    request.open('DELETE', `${site}/${id}`, true)
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(this.response)
            callback(data)
        }
        else {
            console.log('error ' + request.status)
            callback()
        }
    }
    request.send()
}

export function deleteEmployee(browser, id) {
    let employees = []
    browser
        .perform(function(done) {
            httpDelete(baseUrl, id, function(response) {
                if (response) {
                    employees = response
                    done()
                }
                else
                    browser.assert.ok(false, 'API GET query failed')
                done()
            })
        })
        .perform(function() {
            browser.assert.ok( ! containsValue(employees, id), `Employee ${id} was deleted.`)
        })
}

// POST Methods
function httpPost(site, uploadData, callback) {
    const request = new XMLHttpRequest()
    request.open('POST', site, true)
    request.setRequestHeader("Content-Type", "application/json");
    const data = JSON.stringify(uploadData)
    request.onload = function () {
        if ( request.status === 200 ) {
            let response = JSON.parse(this.response)
            callback(response)
        }
        else {
            console.log('error ' + request.status)
            callback()
        }
    }
    request.send(data)
}

export function postEmployee(browser, uploadData) {
    let employees = []
        browser
            .perform(function(done) {
                httpPost(baseUrl, uploadData, function(response) {
                    if (response) {
                        employees = response
                        done()
                    }
                    else
                        browser.assert.ok(false, 'API POST query failed')
                    done()
                })
            })
            .perform(function() {
                browser.assert.ok(containsValue(employees, uploadData.name), `${uploadData.name} posted successfully.`)
            })
}

