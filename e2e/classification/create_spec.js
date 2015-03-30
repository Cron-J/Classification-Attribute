'use strict';

describe('Classification create page', function() {
  var text_helper;
  var dropdown_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    this.title = browser.getTitle();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    browser.get('http://localhost:3036/#/');
    browser.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[2].click();
    });
    expect(browser.getCurrentUrl()).toContain('/classifications');
    browser.sleep(200);
    element(by.buttonText('Add New')).click();
    browser.sleep(200);
  });

  afterEach(function() {
    browser.sleep(500);
  });

  describe('should', function() {
    describe('create the Classification', function() {
      it('if sufficient details are provided', function() {
      	var cId = element(by.model('classification.classificationId'));
      	cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        var tRef = element(by.model('classification.tenantRef'));
        tRef.sendKeys('tenan');
        browser.sleep(1200);
        tRef.sendKeys(protractor.Key.ENTER);
        element(by.buttonText('Save')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
      });

      it('evenhtough wraning messages are present', function() {
        element(by.css('[ng-click="reset()"]')).click();
        var cId = element(by.model('classification.classificationId'));
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(2));
        var tRef = element(by.model('classification.tenantRef'));
        element(by.css('[ng-click="searchTenantName()"]')).click();
        browser.sleep(100);
        element.all(by.css('[ng-click="searchTenantDetails();setTenantList()"]')).then(function(items) {
         items[1].click();
        });
        element.all(by.css('[ng-click="getTenantInfo(result)"]')).then(function(items) {
         items[1].click();
        });
        browser.sleep(100);
        element.all(by.model('sd.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classification.descriptions.descShort)"]')).click();
        element.all(by.model('sd.language')).then(function(items) {
          items[1].sendKeys('e'+protractor.Key.ENTER);
        });
        browser.sleep(500);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have selected same language more than once');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(50));
        });
        element.all(by.model('sd.language')).then(function(items) {
          items[1].sendKeys('d'+protractor.Key.ENTER);
        });
        browser.sleep(500);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have changed the language please check description');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
        element(by.css('[ng-click="add_desc(classification.descriptions.descShort)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You are not allowed to add more than limit');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classification.descriptions.descLong)"]')).click();
        element.all(by.model('sd.language')).then(function(items) {
          items[3].sendKeys('e'+protractor.Key.ENTER);
        });
        browser.sleep(500);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have selected same language more than once');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
        element.all(by.model('sd.description')).then(function(items) {
          items[3].sendKeys(text_helper.getRandomString(50));
        });
        element.all(by.model('sd.language')).then(function(items) {
          items[3].sendKeys('d'+protractor.Key.ENTER);
        });
        browser.sleep(500);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have changed the language please check description');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
        element(by.css('[ng-click="add_desc(classification.descriptions.descLong)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You are not allowed to add more than limit');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
        var vNo = element(by.model('classification.versionNo'));
        vNo.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(2));
        var type = element(by.model('classification.type'));
        type.sendKeys('p'+protractor.Key.ENTER);
        var oNo = element(by.model('classification.orderNo'));
        oNo.sendKeys(text_helper.getRandomNumber(2));
        var du1 = element(by.model('classification.documentUrl1'));
        du1.sendKeys('https://www.'+text_helper.getRandomString(5)+'.in');
        var du2 = element(by.model('classification.documentUrl2'));
        du2.sendKeys('https://www.'+text_helper.getRandomString(6)+'.co');
        var du3 = element(by.model('classification.documentUrl3'));
        du3.sendKeys('https://www.'+text_helper.getRandomString(8)+'.com');
        element(by.buttonText('Save')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
      });
    });

    it('show popup if sufficient details are not provided to create attribute', function() {
      var aId = element(by.model('classification.classificationId'));
      aId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
      element(by.buttonText('Save')).click();
      browser.sleep(100);
      element.all(by.tagName('p')).then(function(items) {
        expect(items[0].getText()).toContain('Please enter valid and required datas');
      });
      element(by.buttonText('Ok')).click();
    });

    describe('show error message when', function() {
      it('dirty data is entered in particular fields', function() {
        var clId = element(by.model('classification.classificationId'));
        clId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomSpecialChar(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[0].getText()).toContain("Classification id won't allow special character(s)");
        }); 
        clId.sendKeys(text_helper.getRandomString(3)+text_helper.getRandomNumber(2));
        browser.sleep(100);
        element.all(by.model('sd.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classification.descriptions.descShort)"]')).click();
        browser.sleep(100);
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[2].getText()).toContain("Short description won't allow special character(s)");
        }); 
        browser.sleep(100);
        element.all(by.css('.btn-default')).then(function(btnitems){
          btnitems[3].click();
        });       
        browser.sleep(100); 
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classification.descriptions.descLong)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        browser.sleep(100);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[3].getText()).toContain("Long description won't allow special character(s)");
        }); 
        browser.sleep(200);
        // var orNo = element(by.model('classification.orderNo'));
        // orNo.sendKeys(text_helper.getRandomString(2));
        // element.all(by.css('.help-block')).then(function(items) {
        //   expect(items[4].getText()).toContain("Order number will allow only numbers");
        // }); 
        // browser.sleep(100);
        // orNo.clear();
        // orNo.sendKeys(text_helper.getRandomNumber(5));
        // browser.sleep(200);
        // var do1 = element(by.model('classification.documentUrl1'));
        // do1.sendKeys('ww.'+text_helper.getRandomSpecialChar(2)+text_helper.getRandomString(5)+'.in');
        // element.all(by.css('.help-block')).then(function(items) {
        //   expect(items[5].getText()).toContain("Provide valid url for document 1");
        // }); 
        // var du2 = element(by.model('classification.documentUrl2'));
        // du2.sendKeys('https//www.'+text_helper.getRandomString(6)+text_helper.getRandomSpecialChar(2)+'.co');
        // element.all(by.css('.help-block')).then(function(items) {
        //   expect(items[6].getText()).toContain("Provide valid url for document 2");
        // }); 
        // var du3 = element(by.model('classification.documentUrl3'));
        // du3.sendKeys('http.'+text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(2)+'.com');
        // element.all(by.css('.help-block')).then(function(items) {
        //   expect(items[7].getText()).toContain("Provide valid url for document 3");
        // }); 
      });
      
      it('same "Classification Id" is used to create new classification', function() {
        var cId = element(by.model('classification.classificationId'));
        cId.sendKeys('9000');
        var tRef = element(by.model('classification.tenantRef'));
        element(by.css('[ng-click="searchTenantName()"]')).click();
        browser.sleep(100);
        element.all(by.css('[ng-click="searchTenantDetails();setTenantList()"]')).then(function(items) {
         items[1].click();
        });
        browser.sleep(300);
        element.all(by.css('[ng-click="getTenantInfo(result)"]')).then(function(items) {
         items[1].click();
        });
        browser.sleep(300);
        element(by.buttonText('Save')).click();
        browser.sleep(100);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('please provide another classification id, it already exis');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
      });
    
    });

    it('reset the fields if click on reset button', function() {
      var cId = element(by.model('classification.classificationId'));
      cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(2));
      var vNo = element(by.model('classification.versionNo'));
      vNo.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(2));
      var type = element(by.model('classification.type'));
      type.sendKeys('p'+protractor.Key.ENTER);
      var oNo = element(by.model('classification.orderNo'));
      oNo.sendKeys(text_helper.getRandomNumber(2));
      var du1 = element(by.model('classification.documentUrl1'));
      du1.sendKeys('https://www.'+text_helper.getRandomString(5)+'.in');
      var du2 = element(by.model('classification.documentUrl2'));
      du2.sendKeys('https://www.'+text_helper.getRandomString(6)+'.co');
      var du3 = element(by.model('classification.documentUrl3'));
      du3.sendKeys('https://www.'+text_helper.getRandomString(8)+'.com');
      element(by.css('[ng-click="reset()"]')).click();
      browser.sleep(100);
    });

    describe('get modal popup when click on cancel and', function() {
      it('able to redirect to Attribute Section search page', function() {
        var cId = element(by.model('classification.classificationId'));
        cId.sendKeys(text_helper.getRandomString(6));
        element.all(by.buttonText('Cancel')).then(function(items) {
         items[1].click();
        });
        browser.sleep(200);
        element(by.buttonText('Yes')).click();
        browser.sleep(500);
      });

      it('able to stay on same page', function() {
        var cId = element(by.model('classification.classificationId'));
        cId.sendKeys(text_helper.getRandomString(3));
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