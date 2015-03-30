'use strict';

describe('Attribute create page', function() {
  var ptor;
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
      items[1].click();
    });
    expect(browser.getCurrentUrl()).toContain('/attributes');
    browser.sleep(500);
    element(by.buttonText('Add New')).click();
    browser.sleep(500);
  });

  afterEach(function() {
    browser.sleep(500);
  });

  describe('should', function() {
    describe('create the Attribute', function() {
      it('if sufficient details are provided', function() {
        var sId = element(by.model('attribute.attributeId'));
        sId.sendKeys('0000');
        browser.sleep(200);
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys('da'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(300);
        element.all(by.buttonText('Save')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(msgs) {
          expect(msgs[0].getText()).toContain('Attribute created succesfully');
        }); 
        browser.sleep(3000);
      });

      it('evenhtough warning messages are present', function() { 
        var atrrId = element(by.model('attribute.attributeId'));
        atrrId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        browser.sleep(200);
        element.all(by.model('sd.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descShort)"]')).click();
        element.all(by.model('sd.language')).then(function(items) {
          items[1].sendKeys('e'+protractor.Key.ENTER);
        });
        browser.sleep(200);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have selected same language more than once');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
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
        browser.sleep(100);
       element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descShort)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You are not allowed to add more than limit');
        }); 
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(200);
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descLong)"]')).click();
        element.all(by.model('sd.language')).then(function(items) {
          items[3].sendKeys('e'+protractor.Key.ENTER);
        });
        browser.sleep(500);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have selected same language more than once');
        }); 
        browser.sleep(100);
        // element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        //   items[0].click();
        // });
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
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descLong)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You are not allowed to add more than limit');
        }); 
        browser.sleep(100);
        // element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        //   items[0].click();
        // });
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys('e'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(2000);
        element.all(by.buttonText('Save')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute created succesfully');
        }); 
        browser.sleep(200);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(500);
      });

      it('by adding avo with multiple languages if isMultiLanguage is checked', function() {
        var attId = element(by.model('attribute.attributeId'));
        attId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys('ref'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        var aR = element(by.model('attribute.isMultiLanguage'));
        aR.click();
        element(by.css('[ng-click="initModal();newAttributeValueOption()"]')).click();
        browser.sleep(500);
        var val = element(by.model('newValueOption.value'));
        val.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(newValueOption.descriptions)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[3].sendKeys(text_helper.getRandomString(50));
        });
        browser.sleep(200);
        element.all(by.buttonText('Add')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute Value Option created Succesfully');
        }); 
        browser.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
        browser.sleep(200);
        element.all(by.buttonText('Save')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute created succesfully');
        }); 
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(100);
      });

     it('by adding atleast avo if isRequired is checked', function() {
        var atId = element(by.model('attribute.attributeId'));
        atId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys('e'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        var aIsR = element(by.model('attribute.isRequired'));
        aIsR.click();
        browser.sleep(200);
        element(by.css('[ng-click="initModal();newAttributeValueOption()"]')).click();
        browser.sleep(500);
        var valO = element(by.model('newValueOption.value'));
        valO.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        browser.sleep(200);
        element.all(by.buttonText('Add')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute Value Option created Succesfully');
        }); 

        browser.sleep(500);
        element.all(by.buttonText('Save')).then(function(items) {
            items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute created succesfully');
        }); 
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
        browser.sleep(3000);
      });

    });

    it('show popup if sufficient details are not provided to create attribute', function() {
      var aId = element(by.model('attribute.attributeId'));
      aId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
      element.all(by.buttonText('Save')).then(function(items) {
        items[0].click();
      });
      element.all(by.tagName('p')).then(function(items) {
        expect(items[0].getText()).toContain('Please enter valid and required datas');
      });
      element(by.buttonText('Ok')).click();
      browser.sleep(200);
    });

    describe('show error message', function() {
      it('when dirty data is entered in particular fields', function() {
        var attributeId = element(by.model('attribute.attributeId'));
        attributeId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomSpecialChar(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[0].getText()).toContain("Attribute id won't allow special character(s)");
        });       
        element.all(by.model('sd.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descShort)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        browser.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[2].getText()).toContain("Description won't allow special character(s)");
        }); 
        browser.sleep(200);
        element.all(by.css('.btn-default')).then(function(items){
          items[2].click();
        });       
        element.all(by.model('sd.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(attribute.descriptions.descLong)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        browser.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[3].getText()).toContain("Long description won't allow special character(s)");
        }); 
        browser.sleep(200);
        element.all(by.css('.btn-default')).then(function(items){
          items[4].click();
        });    
        var eaId = element(by.model('attribute.extAttributeId'));
        eaId.sendKeys(text_helper.getRandomSpecialChar(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[3].getText()).toContain("Attribute id won't allow special character");
        });     
        var edn = element(by.model('attribute.extDefaultName'));
        edn.sendKeys(text_helper.getRandomSpecialChar(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[4].getText()).toContain("Ext default name won't allow special character(s)");
        }); 
        var oNo = element(by.model('attribute.orderNo'));
        oNo.sendKeys(text_helper.getRandomString(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[5].getText()).toContain("Order number will allow only numbers");
        }); 
        browser.sleep(500);
        element(by.css('[ng-click="initModal();newAttributeValueOption()"]')).click();
        browser.sleep(500); 
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomSpecialChar(2));
        });
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[10].getText()).toContain("Description won't allow special character(s)");
        });  
        var odNo = element(by.model('newValueOption.orderNo'));
        odNo.sendKeys(text_helper.getRandomString(2));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[11].getText()).toContain("Order no will take numbers only");
        });                
        var sf = element(by.model('newValueOption.surchargeFactor'));
        sf.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[12].getText()).toContain("Surcharge Factor will take decimal numbers with precision 2");
        }); 
        var sa = element(by.model('newValueOption.surchargeAmount'));
        sa.sendKeys(text_helper.getRandomNumber(2)+'.'+text_helper.getRandomNumber(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[13].getText()).toContain("Surcharge Amount will take decimal numbers with precision 2");
        }); 
        var url = element(by.model('newValueOption.imageUrl'));
        url.sendKeys(text_helper.getRandomString(5));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[14].getText()).toContain("Provide valid url");
        }); 
        element(by.css('[ng-click="clearData();resetCurrencyField()"]')).click();
        browser.sleep(500);
      });

      it('when isRequired selected and attribute value option is not added', function() {
        browser.sleep(200);
        var aId = element(by.model('attribute.attributeId'));
        aId.clear();
        aId.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(3));
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys(protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        var aR = element(by.model('attribute.isRequired'));
        aR.click();
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Please add atleast one attribute value option');
        }); 
        browser.sleep(300);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
      });
      
      it('same "Attribute Id" is used to create new attribute', function() {
        browser.sleep(300);
        var aId = element(by.model('attribute.attributeId'));
        aId.clear();
        aId.sendKeys('1000');
        browser.sleep(200);
        element.all(by.buttonText('None selected')).then(function(items) {
          items[1].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[1].sendKeys(protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        browser.sleep(200);
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('please provide another attribute id, it already exis');
        }); 
        browser.sleep(100);
        element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
          items[0].click();
        });
      });
    });

    it('reset the fields if click on reset button', function() {
      element.all(by.model('sd.description')).then(function(items) {
        items[0].sendKeys(text_helper.getRandomString(100));
      }); 
      var oNo = element(by.model('attribute.orderNo'));
      oNo.sendKeys(text_helper.getRandomNumber(4));
      element(by.css('[ng-click="reset()"]')).click();
      browser.sleep(100);
    });

    describe('get modal popup when click on cancel and', function() {
      it('able to redirect to Attribute search page', function() {
        var aId = element(by.model('attribute.attributeId'));
        aId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3));
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        browser.sleep(200);
        element.all(by.buttonText('Yes')).then(function(items) {
          items[0].click();
        }); 
        browser.sleep(500);
      });

      it('able to stay on same page', function() {
        var aId = element(by.model('attribute.attributeId'));
        aId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomNumber(3))
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        browser.sleep(200);
        element(by.buttonText('No')).click();
        browser.sleep(500);
      });
    });

  });

});