import {getEmployees, postEmployee, deleteEmployee} from '../functions/httpApiMethods';
import {employeeData, modifyData} from '../testAssets/employeeData';

let employeeMgrPage     = {};
const employeesAdded    = {};
const originalEmployees = {};

module.exports = {
    beforeEach: function(browser) {
        employeeMgrPage = browser.page.employeeMgrPage()
        employeeMgrPage.navigate()
            .waitForElementPresent('@app', 5000)
    },
    after: function(browser) {
        browser.end()
    },

    'Get list of original employees in the directory': function() {
        // Get current list so we leave it the way we found it
        getEmployees(employeeMgrPage, function(employees) {
            employees.forEach(employee => {
                originalEmployees[employee.employee_id] = 1
            })
        })
    },

    'Add my list of employees to the directory': function() {
        // Add my list of employees to directory if not already present
        employeeData.forEach(employee => {
            if (originalEmployees[employee.id]) {
                //console.log('Employee ' + employee.id + ' already EXISTS in directory')
            }
            else {
                postEmployee(employeeMgrPage, employee);
                employeesAdded[employee.id] = 1;
            }
        })
		employeeMgrPage.pause(5000);
    },

    'Modify a random employee that I previously added': function() {
        const randomID = function(obj) {
            const keys = Object.keys(obj);
            return keys[keys.length * Math.random() << 0];
        };
        modifyData.id = randomID(employeesAdded);
        console.log(modifyData.id, modifyData.name);
        deleteEmployee(employeeMgrPage, modifyData.id);
        postEmployee(employeeMgrPage, modifyData);
		employeeMgrPage.pause(5000);
    },

    'Delete new employees that I added': function() {
        // Delete all but the original employees in the directory
        getEmployees(employeeMgrPage, function(employees) {
            employees.forEach(function(employee) {
                if ( ! originalEmployees[employee.employee_id] ) {
                    deleteEmployee(employeeMgrPage, employee.employee_id)
                }
                else {
                    //console.log('Nothing to delete')
                }
            })
        })
    },
};