'use strict';

describe('Classification Edit page', function() {
  var ptor;
  var text_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    browser.get('http://localhost:3036/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[2].click();
    });
    var cId = element(by.model('searchQuery.classificationId'));
    cId.sendKeys('900');
    element(by.css('[ng-click="search();filtered();"]')).click();
    cId.clear();
    element.all(by.tagName('td')).then(function(rows) {
        rows[2].click();
    });
    expect(browser.getCurrentUrl()).toContain('/classifications');
    element.all(by.tagName('h3')).then(function(items) {
      expect(items[2].getText()).toBe('Edit Classification');
    });
    ptor.sleep(500);
    element(by.buttonText('Edit Classification Groups')).click();
    ptor.sleep(500);
  });

  afterEach(function() {
    ptor.sleep(100);
  })

  describe('able to', function() {
    beforeEach(function() {
      ptor.sleep(500);
    });

    describe('edit', function() {
      it('classificationGroup if sufficient details are provided', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[1].click();
        });
        var cId = element(by.model('classificationGroup.classificationGroupId'));
        cId.clear();
        cId.sendKeys(text_helper.getRandomString(4)+text_helper.getRandomSpecialChar(3));
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[7].getText()).toContain("Classification group id won't allow special character(s)");
        });
        cId.clear();
        cId.sendKeys(text_helper.getRandomString(4));
        element.all(by.model('sd.description')).then(function(items) {
          items[2].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classificationGroup.descriptions.descShort)"]')).click();
        element.all(by.model('sd.description')).then(function(items) {
          items[3].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(2));
        });
        ptor.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[9].getText()).toContain("Short description won't allow special character(s)");
        }); 
        ptor.sleep(200);
        element.all(by.css('.glyphicon-remove')).then(function(items){
          items[2].click();
        });  
        element.all(by.model('sd.description')).then(function(items) {
          items[2].clear();
          items[2].sendKeys(text_helper.getRandomString(50));
        });      
        element.all(by.model('ld.description')).then(function(items) {
          items[0].sendKeys(text_helper.getRandomString(100));
        });
        element(by.css('[ng-click="add_desc(classificationGroup.descriptions.descLong)"]')).click();
        element.all(by.model('ld.description')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomString(10) + text_helper.getRandomSpecialChar(3));
        });
        ptor.sleep(200);
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[10].getText()).toContain("Long description won't allow special character(s)");
        }); 
        ptor.sleep(200);
        element.all(by.css('.glyphicon-remove')).then(function(items){
          items[3].click();
        });
        element.all(by.model('ld.description')).then(function(items) {
          items[0].clear();
          items[0].sendKeys(text_helper.getRandomString(50));
        });
        var oNo = element(by.model('classificationGroup.orderNo'));
        oNo.clear();
        oNo.sendKeys(text_helper.getRandomNumber(5));
        var du1 = element(by.model('classificationGroup.documentUrl1'));
        du1.clear();
        du1.sendKeys('ww.'+text_helper.getRandomSpecialChar(2)+text_helper.getRandomString(5)+'.in');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[11].getText()).toContain("Provide valid url for document 1");
        }); 
        du1.clear();
        du1.sendKeys('http://www.'+text_helper.getRandomString(5)+'.in');
        var du2 = element(by.model('classificationGroup.documentUrl2'));
        du2.clear();
        du2.sendKeys('https//www.'+text_helper.getRandomString(6)+text_helper.getRandomSpecialChar(2)+'.co');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[12].getText()).toContain("Provide valid url for document 2");
        }); 
        du2.clear();
        du2.sendKeys('https://www.'+text_helper.getRandomString(6)+'.co');
        var du3 = element(by.model('classificationGroup.documentUrl3'));
        du3.clear();
        du3.sendKeys('http.'+text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(2)+'.com');
        element.all(by.css('.help-block')).then(function(items) {
          expect(items[13].getText()).toContain("Provide valid url for document 3");
        });
        du3.clear();  
        du3.sendKeys('https://www.'+text_helper.getRandomString(5)+'.com');
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Classification Group updated succesfully');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });

      it('attribute if sufficient details are provided', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[0].click();
        });
        element.all(by.css('[ng-click="resetParentPage();edit_attribute(attribute, $index)"]')).then(function(items) {
          items[0].click();
        });
        element.all(by.css('[ng-click="searchAttribute($index, attribute)"]')).then(function(items) {
          items[0].click();
        });
        element(by.css('[ng-click="search();setShowList()"]')).click();
        element.all(by.css('[ng-click="getAttributeDetails(result)"]')).then(function(items) {
         items[1].click();
        });
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomNumber(3));
        ptor.sleep(100);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('attribute updated');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });

    });

    describe('show error message(s) when', function() {
      beforeEach(function() {
        ptor.sleep(500);
      });

      it('attribute is trying to add with dirty data', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[1].click();
        });
        element(by.buttonText('+ Add Attribute')).click();
        var aRef = element(by.model('attribute.attributeRef'));
        aRef.sendKeys('100');
        ptor.sleep(1200);
        aRef.sendKeys(protractor.Key.ENTER);
        var sNo = element(by.model('attribute.sortNo'));
        sNo.sendKeys(text_helper.getRandomString(4));
        ptor.sleep(100);
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(3));
        ptor.sleep(100);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Please enter valid and required data');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });

      it('attribute is trying to add with same attributeId twice', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[0].click();
        });
        element(by.buttonText('+ Add Attribute')).click();
        element.all(by.model('attribute.attributeRef')).then(function(items) {
          items[1].sendKeys('ExHb100');
          ptor.sleep(1200);
          items[1].sendKeys(protractor.Key.ENTER);
        });
        element.all(by.model('attribute.sortNo')).then(function(items) {
          items[1].sendKeys(text_helper.getRandomNumber(4));
        });
        ptor.sleep(100);
        element.all(by.buttonText('Save')).then(function(items) {
          items[2].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('You have entered same attribute twice, please select another attribute');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });

      it('attribute is trying to add with non-existed attribute id', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[1].click();
        });
        element(by.buttonText('+ Add Attribute')).click();
        var aRef = element(by.model('attribute.attributeRef'));
        aRef.sendKeys('attribute');
        var sNo = element(by.model('attribute.sortNo'));
        sNo.sendKeys(text_helper.getRandomString(4));
        ptor.sleep(100);
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(3));
        ptor.sleep(100);
        element.all(by.buttonText('Save')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Please enter valid attributeId');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });

      it('trying to add new attribute if before one is not created', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[1].click();
        });
        element(by.buttonText('+ Add Attribute')).click();
        var aRef = element(by.model('attribute.attributeRef'));
        element(by.css('[ng-click="searchAttribute($index, attribute)"]')).click();
        ptor.sleep(100);
        var cgId = element(by.model('searchQuery.attributeId'));
        cgId.sendKeys('100');
        element(by.css('[ng-click="search();setShowList()"]')).click();
        element.all(by.css('[ng-click="getAttributeDetails(result)"]')).then(function(items) {
         items[1].click();
        });
        ptor.sleep(100);
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(3));
        ptor.sleep(100);
        element(by.buttonText('+ Add Attribute')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Please add attribute with complete valid data');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
      });
    });

    describe('remove', function() {
      beforeEach(function() {
        ptor.sleep(500);
      });

      it('the attribute, which is not yet created, if click on cancel', function() {
        element(by.buttonText('+ Add Attribute')).click();
        ptor.sleep(100);
        var aRef = element(by.model('attribute.attributeRef'));
        aRef.sendKeys('100');
        ptor.sleep(1200);
        aRef.sendKeys(protractor.Key.DOWN+protractor.Key.ENTER);
        ptor.sleep(100);
        var gId = element(by.model('attribute.grpId'));
        gId.sendKeys(text_helper.getRandomString(1)+text_helper.getRandomSpecialChar(3));
        element.all(by.css('[ng-click="cancelUpdate(attribute, $index)"]')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(200);
      });

      it('the changes of attribute if click on cancel', function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(100);
        element.all(by.css('[ng-click="resetParentPage();edit_attribute(attribute, $index)"]')).then(function(items) {
          items[0].click();
        });
        element.all(by.css('[ng-click="cancelUpdate(attribute, $index)"]')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(200);
      });

      it('the the attribute if click on delete', function() {
        element.all(by.css('[ng-click="selectNode(child.child_id, false, false, subItem.parent_id, false, true)"]')).then(function(items) {
          items[1].click();
        });
        ptor.sleep(500);
        element.all(by.css('[ng-click="delete_attribute($index)"]')).then(function(items) {
          items[1].click();
        });
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('Attribute deleted succesfully');
        }); 
        ptor.sleep(100);
        element(by.css('[ng-click="deleteMessage(message)"]')).click();
        ptor.sleep(200);
      });
    });

    describe('get modal popup when click on cancel and', function() {
      beforeEach(function() {
        ptor.sleep(500);
        element(by.css('[ng-click="isCreateSubGroup(false)"]')).click();
        ptor.sleep(200);   
      });
      it('able to redirect to classification edit page', function() {
        element.all(by.buttonText('Yes')).then(function(items) {
          items[1].click();
        });
        ptor.sleep(500);
      });

      it('able to stay on same page', function() {
        element.all(by.buttonText('No')).then(function(items) {
          items[1].click();
        });
        ptor.sleep(500);
      });

    });

    describe('get modal popup when click on attribute link', function() {
      beforeEach(function() {
        element.all(by.css('[ng-click="selectNode(subItem.parent_id, true);"]')).then(function(items) {
          items[0].click();
        });
        element.all(by.css('[ng-click="redirectToAttribute(attribute.attributeRef._id)"]')).then(function(items) {
          items[0].click();
        });
        ptor.sleep(200);
      });
      it('redirect to edit attribute page', function() {
        element.all(by.buttonText('Yes')).then(function(items) {
          items[3].click();
        });
        ptor.sleep(1500);
      });
      it('stay on same page', function() {
        element.all(by.buttonText('No')).then(function(items) {
          items[1].click();
        });
        ptor.sleep(500);
      });
    });

  });

});