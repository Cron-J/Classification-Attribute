'use strict';

describe('Attribute Section Edit page', function() {
  var text_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    this.title = browser.getTitle();
    text_helper = require('../helpers/random_text.js');
    browser.get('http://localhost:3036/#/');
    browser.sleep(500);
    var asId = element(by.model('searchQuery.attributeSectionId'));
      asId.sendKeys('900');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      browser.sleep(500);
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('#/');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Attribute Section');
      });
    browser.sleep(500);   
  });

  afterEach(function() {

  })
  describe('able to', function() {
    it('show error message if dirty data is entered and update on valid data', function() {
      element.all(by.model('sd.name')).then(function(items) {
        items[0].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(4));
      });
      browser.sleep(500);
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[1].getText()).toContain("Name won't allow special character(s)");
      }); 
      browser.sleep(500);
      element.all(by.model('sd.name')).then(function(items) {
        items[0].clear();
        items[0].sendKeys(text_helper.getRandomString(50));
      });
      var oNo = element(by.model('attributeSection.orderNo'));
      oNo.clear();
      oNo.sendKeys(text_helper.getRandomNumber(4));
      element(by.buttonText('Update')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute Section updated Succesfully');
      }); 
      browser.sleep(100);
    });

    describe('get modal popup when click on cancel and', function() {
      beforeEach(function() {
        browser.sleep(500);   
      });
      it('able to redirect to Attribute Section search page', function() {
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        browser.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[0].click();
        });
        browser.sleep(500);
      });

      it('able to stay on same page', function() {
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        browser.sleep(200);
        element(by.buttonText('No')).click();
        browser.sleep(500);
      });
    });
  });

});