'use strict';

describe('Classification Create page', function() {
  var text_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    this.title = browser.getTitle();
    text_helper = require('../helpers/random_text.js');
    browser.get('http://localhost:3036/#/');
    browser.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[2].click();
    });
    var cId = element(by.model('searchQuery.classificationId'));
    cId.sendKeys('900');
    element(by.css('[ng-click="search();filtered();"]')).click();
    cId.clear();
    browser.sleep(1500);
    element.all(by.tagName('td')).then(function(rows) {
        rows[2].click();
    });
    expect(browser.getCurrentUrl()).toContain('/classifications');
    browser.sleep(200);
    element.all(by.tagName('h3')).then(function(items) {
      expect(items[2].getText()).toBe('Edit Classification');
    });
    browser.sleep(300);
    element(by.buttonText('Edit Classification Groups')).click();
    browser.sleep(500);
  });

  afterEach(function() {

  })
  describe('able to', function() {
    describe('create', function() {
      it('parent if sufficient details are provided', function() {
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        browser.sleep(100);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification Group created succesfully');
        }); 
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

      it('child if sufficient details are provided', function() {
        var pRef = element(by.model('classificationGroup.parentClassificationGrpRef'));
        pRef.sendKeys('p1_90');
        browser.sleep(1200);
        pRef.sendKeys(protractor.Key.ENTER);
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        element(by.buttonText('+ Add Attribute')).click();
        var aRef = element(by.model('attribute.attributeRef'));
        aRef.sendKeys('100');
        browser.sleep(1200);
        aRef.sendKeys(protractor.Key.ENTER);
        var sNo = element(by.model('attribute.sortNo'));
        sNo.sendKeys(text_helper.getRandomNumber(4));
        browser.sleep(100);
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomNumber(3));
        browser.sleep(100);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('New attribute is added');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
        element.all(by.buttonText('Save')).then(function(items) {
          items[2].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification Group created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

      it('child if through create-subgroup', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[0].click();
        });
        element(by.buttonText('Create Sub-group')).click();
        browser.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[2].click();
        });
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        browser.sleep(100);
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        browser.sleep(200);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        browser.sleep(200);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification Group created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

      it('sub-child if sufficient details are provided', function() {
        var pRef = element(by.model('classificationGroup.parentClassificationGrpRef'));
        element(by.css('[ng-click="searchParentId()"]')).click();
        browser.sleep(200);
        var cId = element(by.model('searchQuery.classificationGroupId'));
        cId.sendKeys('p1_c1');
        element(by.css('[ng-click="search();setParentList()"]')).click();
        browser.sleep(1000);
        element.all(by.css('[ng-click="getParentDetails(result)"]')).then(function(items) {
         items[1].click();
        });
        browser.sleep(200);
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        browser.sleep(200);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification Group created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

    });

    describe('show error message(s) when', function() {
      it('dirty data is entered in particular fields', function() {
        var caId = element(by.model('classificationGroup.classificationGroupId'));
        caId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomSpecialChar(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[7].getText()).toContain("Classification group id won't allow special character(s)");
        });
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classificationGroup.descriptions.descShort)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[3].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        browser.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[9].getText()).toContain("Short description won't allow special character(s)");
        }); 
        browser.sleep(200);
        element.all(by.css('.glyphicon-remove')).then(function(items){
          items[2].click();
        });      
        element.all(by.model('ld.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classificationGroup.descriptions.descLong)"]')).click();
        element.all(by.model('ld.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(3));
        });
        browser.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[10].getText()).toContain("Long description won't allow special character(s)");
        }); 
        browser.sleep(200);
        element.all(by.css('.glyphicon-remove')).then(function(items){
          items[3].click();
        });
        var oNo = element(by.model('classificationGroup.orderNo'));
        oNo.sendKeys(text_helper.getRandomString(5));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[10].getText()).toContain("Order number will allow only numbers");
        });
        var du1 = element(by.model('classificationGroup.documentUrl1'));
        du1.sendKeys('ww.'+text_helper.getRandomSpecialChar(2)+text_helper.getRandomString(5)+'.in');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[11].getText()).toContain("Provide valid url for document 1");
        }); 
        var du2 = element(by.model('classificationGroup.documentUrl2'));
        du2.sendKeys('https//www.'+text_helper.getRandomString(6)+text_helper.getRandomSpecialChar(2)+'.co');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[12].getText()).toContain("Provide valid url for document 2");
        }); 
        var du3 = element(by.model('classificationGroup.documentUrl3'));
        du3.sendKeys('http.'+text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(2)+'.com');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[13].getText()).toContain("Provide valid url for document 3");
        });
        browser.sleep(200);
      });

      it('sub child is selected as parent', function() {
        var pRef = element(by.model('classificationGroup.parentClassificationGrpRef'));
        pRef.sendKeys('p1_c1_s1_90');
        browser.sleep(1200);
        pRef.sendKeys(protractor.Key.ENTER);
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('selected Classification Group Id can not be sub child, please enter valid Parent Id');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

      it('non existed parent id is entered', function() {
        var pRef = element(by.model('classificationGroup.parentClassificationGrpRef'));
        pRef.sendKeys('parent');
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var status = element(by.model('classificationGroup.status'));
        status.sendKeys(''+protractor.Key.DOWN+protractor.Key.ENTER);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Please enter valid Parent Id');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

    });

    describe('get modal popup when click on cancel and', function() {
      beforeEach(function() {
        browser.sleep(500);
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        browser.sleep(200);   
      });

      it('able to redirect to classification edit page', function() {
        element.all(by.buttonText('Yes')).then(function(items) {
          items[1].click();
        });
        browser.sleep(500);
      });

      it('able to stay on same page', function() {
        element.all(by.buttonText('No')).then(function(items) {
          items[1].click();
        });
        browser.sleep(500);
      });

    });
  
  });

});