'use strict';

describe('Attribute Edit page', function() {
  var ptor;
  var text_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    browser.get('http://localhost:3036/#/');
     ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
    });
    expect(browser.getCurrentUrl()).toContain('/attributes');
    ptor.sleep(500);
    var asId = element(by.model('searchQuery.attributeId'));
      asId.sendKeys('100');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('#/');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Attribute');
      });
    ptor.sleep(500);   
  });

  afterEach(function() {

  })
  describe('able to', function() {
    it('show error message if dirty data is entered and update on valid data', function() {
      element.all(by.model('sd.description')).then(function(items) {
        items[0].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
      });
      ptor.sleep(200);
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[1].getText()).toContain("Description won't allow special character(s)");
      });
      element.all(by.model('sd.description')).then(function(items) {
        items[0].clear();
        items[0].sendKeys(text_helper.getRandomString(50));
      });
      element.all(by.model('sd.description')).then(function(items) {
        items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
      });
      ptor.sleep(200);
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[2].getText()).toContain("Long description won't allow special character(s)");
      }); 
      ptor.sleep(200);
      element.all(by.model('sd.description')).then(function(items) {
        items[1].clear();
        items[1].sendKeys(text_helper.getRandomString(50));
      });
      var eaId = element(by.model('attribute.extAttributeId'));
      eaId.sendKeys(text_helper.getRandomSpecialChar(2));
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[3].getText()).toContain("Attribute id won't allow special character");
      }); 
      eaId.clear();
      eaId.sendKeys(text_helper.getRandomString(4));
      var edn = element(by.model('attribute.extDefaultName'));
      edn.sendKeys(text_helper.getRandomSpecialChar(2));
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[4].getText()).toContain("Ext default name won't allow special character(s)");
      }); 
      edn.clear();
      edn.sendKeys(text_helper.getRandomString(4));
      var oNo = element(by.model('attribute.orderNo'));
      oNo.clear();
      oNo.sendKeys(text_helper.getRandomNumber(4));
      ptor.sleep(500);
      element.all(by.css('[ng-click="editValueOption(avo, $index)"]')).then(function(items) {
        items[0].click();
      });
      element.all(by.model('sd.description')).then(function(items) {
        items[2].sendKeys(text_helper.getRandomSpecialChar(2));
      });
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[10].getText()).toContain("Description won't allow special character(s)");
      });  
      element.all(by.model('sd.description')).then(function(items) {
        items[2].clear();
        items[2].sendKeys(text_helper.getRandomString(50));
      });
      var odNo = element(by.model('newValueOption.orderNo'));
      odNo.clear();
      odNo.sendKeys(text_helper.getRandomNumber(4));               
      var sf = element(by.model('newValueOption.surchargeFactor'));
      sf.clear();
      sf.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(3));
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[12].getText()).toContain("Surcharge Factor will take decimal numbers with precision 2");
      }); 
      sf.clear();
      sf.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(2));
      var sa = element(by.model('newValueOption.surchargeAmount'));
      sa.clear();
      sa.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(3));
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[13].getText()).toContain("Surcharge Amount will take decimal numbers with precision 2");
      }); 
      sa.clear();
      sa.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(1));
      var url = element(by.model('newValueOption.imageUrl'));
      url.clear();
      url.sendKeys(text_helper.getRandomString(5));
      element.all(by.css('.help-block')).then(function(items) {
        expect(items[14].getText()).toContain("Provide valid url");
      }); 
      url.clear();
      url.sendKeys('https://www.'+text_helper.getRandomString(5)+'.com');
      ptor.sleep(100);
      element.all(by.buttonText('Update')).then(function(items) {
        items[1].click();
      }); 
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute Value Option updated Succesfully');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      ptor.sleep(500);
      element.all(by.buttonText('Update')).then(function(items) {
        items[3].click();
      }); 
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute updated Succesfully');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });

    describe('get modal popup when click on cancel and', function() {
      beforeEach(function() {
        ptor.sleep(500);   
      });
      it('able to redirect to Attribute Section search page', function() {
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        ptor.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(500);
      });

      it('able to stay on same page', function() {
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        ptor.sleep(200);
        element(by.buttonText('No')).click();
        ptor.sleep(500);
      });
    });
  });

});