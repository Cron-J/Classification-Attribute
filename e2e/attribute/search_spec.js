'use strict';

describe('Attribute search page', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    browser.get('http://localhost:3036/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
    });
    expect(browser.getCurrentUrl()).toContain('/attributes');
    ptor.sleep(500);   
  });

  afterEach(function() {
    ptor.sleep(500);
  })
  describe('able to get', function() {
    it('page headings', function(){   
      element.all(by.tagName('h1')).then(function(items) {
        expect(items[0].getText()).toBe('Attributes');
      });
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[0].getText()).toBe('Search Attribute');
      });   
    })

    it('all search results when directly click on search button', function() {
       element(by.css('[ng-click="search()"]')).click();
    });

    describe('search results with', function() {
      it('"Attribute Id" as keyword', function() {
        var aId = element(by.model('searchQuery.attributeId'));
        aId.sendKeys('100');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Ext Attribute ID" as keyword', function() {
        var eaId = element(by.model('searchQuery.extAttributeId'));
        eaId.sendKeys('789');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Description" as keyword', function() {
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this is the description');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Section" as keyword', function() {
        var sRef = element(by.model('searchQuery.sectionRef'));
        sRef.sendKeys('10');
        ptor.sleep(1200);
        sRef.sendKeys(protractor.Key.ENTER);
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id" and "Description" combination of 2 keywords', function() {
        var aId = element(by.model('searchQuery.attributeId'));
        aId.sendKeys('100');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('qwerta');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id", "Description" and "Section" combination of 3 keywords', function() {
        var asId = element(by.model('searchQuery.attributeId'));
        asId.sendKeys('100');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('qwerta');
        var sRef = element(by.model('searchQuery.sectionRef'));
        sRef.sendKeys('100');
        ptor.sleep(1200);
        sRef.sendKeys(protractor.Key.DOWN + protractor.Key.DOWN + protractor.Key.ENTER);
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id", "Description" and "Ext Attribute Id" combination of 4 keywords', function() {
        var asId = element(by.model('searchQuery.attributeId'));
        asId.sendKeys('100');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this');
        var eaId = element(by.model('searchQuery.extAttributeId'));
        eaId.sendKeys('789');
        var sRef = element(by.model('searchQuery.sectionRef'));
        element(by.css('[ng-click="searchsectionId()"]')).click();
        ptor.sleep(100);
        element(by.css('[ng-click="search();setSectionList()"]')).click();
        element.all(by.css('[ng-click="getSectionDetails(result)"]')).then(function(items) {
         items[1].click();
        });
        ptor.sleep(100);
        element(by.buttonText('Search')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });
    });

    it('0 search result message when no record is found', function() {
      var aId = element(by.model('searchQuery.attributeId'));
      aId.sendKeys('1000');
      var eaId = element(by.model('searchQuery.extAttributeId'));
      eaId.sendKeys('111');
      element(by.css('[ng-click="search()"]')).click();
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[1].getText()).toBe('Found 0 entry');
      });
      ptor.sleep(1000);
      element(by.buttonText('Reset')).click();
    });

  });  

  describe('able to', function() {
    it('show message when that attribute is add in CG when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.attributeId'));
      aId.sendKeys('10');
      element(by.css('[ng-click="search()"]')).click();
      aId.clear();
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
      element(by.css('[ng-click="ok()"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('this attribute is assigned in classification group, so can not be deleted.');
      });
      ptor.sleep(500);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });

    it('delete the record when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.attributeId'));
      aId.sendKeys('60');
      element(by.css('[ng-click="search()"]')).click();
      aId.clear();
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
      element(by.css('[ng-click="ok()"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute removed Succesfully');
      });
      ptor.sleep(500);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });

    it('do not delete the record when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.attributeId'));
      aId.sendKeys('60');
      element(by.css('[ng-click="search()"]')).click();
      aId.clear();
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      element(by.css('[ng-click="cancel()"]')).click();
      ptor.sleep(1000);
    });

    it('go to edit page of the record when click on particular record row', function() {
      var asId = element(by.model('searchQuery.attributeId'));
      asId.sendKeys('90');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('/attributes');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Attribute');
      });
      ptor.sleep(1000);
    });
  });

});