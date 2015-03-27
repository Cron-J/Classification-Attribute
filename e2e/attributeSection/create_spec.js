'use strict';

describe('Attribute Section create page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    browser.get('http://localhost:3036/#/');
    ptor.sleep(500);
    element(by.buttonText('Add New')).click();
    ptor.sleep(500);
  });

  afterEach(function() {
    ptor.sleep(500);
  });

  describe('should', function() {
    it('create the Attribute Section if sufficient details are provided', function() {
    	var asId = element(by.model('attributeSection.attributeSectionId'));
    	asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
      element(by.buttonText('Save')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute Section created succesfully');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });

    describe('show error message when', function() {
      it('dirty data is entered in attribute section id', function() {
        var asId = element(by.model('attributeSection.attributeSectionId'));
        asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomSpecialChar(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[0].getText()).toContain("Ext attribute section id won't allow special character(s)");
        }); 
        element.all(by.model('sd.name')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_name(attributeSection.names)"]')).click();
        element.all(by.model('sd.name')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        ptor.sleep(500);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[2].getText()).toContain("Name won't allow special character(s)");
        }); 
        ptor.sleep(500);
        element.all(by.css('.btn-default')).then(function(items){
          items[2].click();
        });
        element.all(by.model('sd.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(attributeSection.descriptions)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        ptor.sleep(500);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[3].getText()).toContain("Description won't allow special character(s)");
        }); 
        ptor.sleep(500);
        element.all(by.css('.btn-default')).then(function(items){
          items[4].click();
        });
        var oNo = element(by.model('attributeSection.orderNo'));
        oNo.sendKeys(text_helper.getRandomString(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[3].getText()).toContain("Order number will allow only numbers");
        }); 
        ptor.sleep(500);
      });

      it('dirty same "Attribute Id" is used to create new attribute', function() {
        var asId = element(by.model('attributeSection.attributeSectionId'));
        asId.sendKeys('9000');
        element(by.buttonText('Save')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('please provide another attribute section id, it already exis');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });
    });

    it('create the Attribute Section evenhtough wraning messages are present', function() {
      element(by.css('[ng-click="reset()"]')).click();
      var asId = element(by.model('attributeSection.attributeSectionId'));
      asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
      element.all(by.model('sd.name')).then(function(items) {
        items[0].sendKeys(text_helper.getRandomString(100));
      });
      element(by.css('[ng-click="add_name(attributeSection.names)"]')).click();
      element.all(by.model('sd.language')).then(function(items) {
        items[1].sendKeys('e'+protractor.Key.ENTER);
      });
      ptor.sleep(500);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You have selected same language more than once');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      element.all(by.model('sd.name')).then(function(items) {
        items[1].sendKeys(text_helper.getRandomString(50));
      });
      element.all(by.model('sd.language')).then(function(items) {
        items[1].sendKeys('d'+protractor.Key.ENTER);
      });
      ptor.sleep(500);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You have changed the language please check name');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      element(by.css('[ng-click="add_name(attributeSection.names)"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You are not allowed to add more than limit');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      ptor.sleep(200);
      element.all(by.model('sd.description')).then(function(items) {
        items[0].sendKeys(text_helper.getRandomString(100));
      });
      element(by.css('[ng-click="add_desc(attributeSection.descriptions)"]')).click();
      element.all(by.model('sd.language')).then(function(items) {
        items[3].sendKeys('e'+protractor.Key.ENTER);
      });
      ptor.sleep(500);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You have selected same language more than once');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      element.all(by.model('sd.description')).then(function(items) {
        items[1].sendKeys(text_helper.getRandomString(50));
      });
      element.all(by.model('sd.language')).then(function(items) {
        items[3].sendKeys('d'+protractor.Key.ENTER);
      });
      ptor.sleep(500);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You have changed the language please check description');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      element(by.css('[ng-click="add_desc(attributeSection.descriptions)"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('You are not allowed to add more than limit');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      element(by.buttonText('Save')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute Section created succesfully');
      }); 
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });
    
    it('reset the fields if click on reset button', function() {
      var asId = element(by.model('attributeSection.attributeSectionId'));
      asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
      var nameList = element(by.model('sd.name'));
      nameList.sendKeys(text_helper.getRandomString(80));
      var descList = element(by.model('sd.description'));
      descList.sendKeys(text_helper.getRandomString(100));
      var oNo = element(by.model('attributeSection.orderNo'));
      oNo.sendKeys(text_helper.getRandomNumber(4));
      element(by.css('[ng-click="reset()"]')).click();
      ptor.sleep(100);
    });

    describe('get modal popup when click on cancel and', function() {
      it('able to redirect to Attribute Section search page', function() {
        var asId = element(by.model('attributeSection.attributeSectionId'));
        asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        ptor.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(500);
      });

      it('able to stay on same page', function() {
       var asId = element(by.model('attributeSection.attributeSectionId'));
        asId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        ptor.sleep(200);
        element(by.buttonText('No')).click();
        ptor.sleep(500);
      });
    });

  });

});