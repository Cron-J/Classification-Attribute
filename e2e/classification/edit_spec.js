'use strict';

describe('Classification Edit page', function() {
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
    browser.sleep(500);
    cId.clear();
    element.all(by.tagName('td')).then(function(rows) {
        rows[2].click();
    });
    expect(browser.getCurrentUrl()).toContain('/classifications');
    browser.sleep(100);
    element.all(by.tagName('h3')).then(function(items) {
      expect(items[2].getText()).toBe('Edit Classification');
    });
    browser.sleep(500);   
  });

  afterEach(function() {

  })
  describe('able to', function() {
    it('show error message if dirty data is entered and update on valid data', function() {
      element.all(by.model('sd.description')).then(function(items) {
        items[0].clear();
        items[0].sendKeys(text_helper.getRandomString(100));
      });
      element(by.css('[ng-click="add_desc(classification.descriptions.descShort)"]')).click();
      element.all(by.model('sd.description')).then(function(items) {
        items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
      });
      browser.sleep(200);
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[2].getText()).toContain("Short description won't allow special character(s)");
      }); 
      browser.sleep(200);
      // element.all(by.model('sd.description')).then(function(items) {
      //   items[0].sendKeys(text_helper.getRandomString(100));
      // });
      element.all(by.model('sd.description')).then(function(items) {
        items[1].clear();
        items[1].sendKeys(text_helper.getRandomString(100));
      });
      element.all(by.css('.btn-default')).then(function(items){
        items[3].click();
      });
      element(by.css('[ng-click="add_desc(classification.descriptions.descLong)"]')).click();
      browser.sleep(100);
      element.all(by.model('sd.description')).then(function(items) {
        items[2].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
      });
      browser.sleep(200);
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[3].getText()).toContain("Long description won't allow special character(s)");
      }); 
      browser.sleep(200);
      element.all(by.model('sd.description')).then(function(items) {
        items[2].clear();
        items[2].sendKeys(text_helper.getRandomString(100));
      });
      element.all(by.css('.btn-default')).then(function(items){
        items[5].click();
      });
      var oNo = element(by.model('classification.orderNo'));
      oNo.clear();
      oNo.sendKeys(text_helper.getRandomNumber(4));
      var du1 = element(by.model('classification.documentUrl1'));
      du1.clear();
      du1.sendKeys('ww.'+text_helper.getRandomSpecialChar(2)+text_helper.getRandomString(5)+'.in');
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[4].getText()).toContain("Provide valid url for document 1");
      });
      du1.clear(); 
      du1.sendKeys('http://www.'+text_helper.getRandomString(5)+'.in');
      var du2 = element(by.model('classification.documentUrl2'));
      du2.clear();
      du2.sendKeys('https//www.'+text_helper.getRandomString(6)+text_helper.getRandomSpecialChar(2)+'.co');
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[5].getText()).toContain("Provide valid url for document 2");
      }); 
      du2.clear();
      du2.sendKeys('http://www.'+text_helper.getRandomString(7)+'.co');
      var du3 = element(by.model('classification.documentUrl3'));
      du3.clear();
      du3.sendKeys('http.'+text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(2)+'.com');
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[6].getText()).toContain("Provide valid url for document 3");
      }); 
      du3.clear();
      du3.sendKeys('http://www.'+text_helper.getRandomString(5)+'.com');
      element(by.buttonText('Update')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Classification updated succesfully');
      }); 
      browser.sleep(100);
      element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        items[0].click();
      });
      browser.sleep(100);
    });

    describe('get modal popup when click on cancel and', function() {
      beforeEach(function() {
        browser.sleep(500);   
      });
      it('able to redirect to Attribute Section search page', function() {
        element.all(by.buttonText('Cancel')).then(function(items) {
         items[1].click();
        });;
        browser.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[0].click();
        });
        browser.sleep(500);
      });

      it('able to stay on same page', function() {
        element.all(by.buttonText('Cancel')).then(function(items) {
         items[1].click();
        });
        browser.sleep(200);
        element(by.buttonText('No')).click();
        browser.sleep(500);
      });
    });
  });

});