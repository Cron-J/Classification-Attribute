classification-attribute
========================

Management of classification and attribute for Node.js/MongoDB/Mongoose with AngularJS based UI, hapi controller

### Install an app

###### *Install node modules*

You need to run the following command in root directory of an app in command prompt.

npm install

###### *Install bower components*

You need to run the following command in /client/src directory of an app in command prompt.

bower install

Note: If you got suggestions about angular version then please select v1.2.27 as shown below

Unable to find a suitable version for angular, please choose one:

    1) angular#1.2.1 which resolved to 1.2.1 and is required by angular-growl#0.4.0

    2) angular#1.2.27 which resolved to 1.2.27 and is required by angular-loader#1.2.27, angular-mocks#1.2.27, angular-resource#1.2.27, angular-route#1.2.27, angular-sanitize#1.2.27

    3) angular#~1.2.x which resolved to 1.2.27 and is required by classification-attribute

    4) angular#>=1 <1.3.0 which resolved to 1.2.27 and is required by angular-bootstrap#0.12.0

    5) angular#~1.2.0 which resolved to 1.2.27 and is required by angularjs-dropdown-multiselect#1.5.2

    6) angular#~1.x which resolved to 1.3.6 and is required by angular-dragdrop#1.0.8

Prefix the choice with ! to persist it to bower.json

[?] Answer: 3 

### Run an app

###### *Run Mongodb Database*

[Mongodb] (http://docs.mongodb.org/manual/)

###### *import database*

import sample data using the given command

mongorestore --host localhost --port 27017 --db [database_name] [path of sample database file]

Note: You will find sample database in root sample-database/classification-attribute.

###### *Run Server*

You need to run the following command in root directory of an app in command prompt.

node server.js

### Run Test

Test cases are written using Mocha for nodejs testing and protractor for angularjs.

Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser.

Protractor runs tests against your application running in a real browser, interacting with it as a user would.

###### *How to run node test*

npm install -g mocha

mocha

 [![Mocha test framework](http://f.cl.ly/items/3l1k0n2A1U3M1I1L210p/Screen%20Shot%202012-02-24%20at%202.21.43%20PM.png)](http://mochajs.org)

###### *How to run angular test*

1. *Initial setup*

    Install jdk and add path to environmental variables

    npm install -g protractor

    webdriver-manager update
    
2. *Commands to run*

    webdriver-manager start

    protractor

[visit protractor] (http://angular.github.io/protractor/#/)

###### *Model Documentation*

Model documentations are written using jsdoc.

JSDoc 3 is an API documentation generator for JavaScript.

You can find model documentation in directory named out in root directory of app.

Open index.html inside out directory.

[jsdoc] (http://usejsdoc.org/)

### Test Script Generator

[Test Script Generator] (https://github.com/Cron-J/Classification-Attribute-Test-Script-Generator)
