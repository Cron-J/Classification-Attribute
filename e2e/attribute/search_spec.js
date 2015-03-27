'use strict';

describe('Attribute search page', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    this.title = browser.getTitle();
    browser.get('http://localhost:3036/#/');
    browser.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
    });
    expect(browser.getCurrentUrl()).toContain('/attributes');
    browser.sleep(500);   
  });

  afterEach(function() {
    browser.sleep(500);
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
        aId.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Ext Attribute ID" as keyword', function() {
        var eaId = element(by.model('searchQuery.extAttributeId'));
        eaId.sendKeys('789');
        element(by.css('[ng-click="search()"]')).click();
        eaId.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Description" as keyword', function() {
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this is the description');
        element(by.css('[ng-click="search()"]')).click();
        desc.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Section" as keyword', function() {
        var sRef = element(by.model('searchQuery.sectionRef'));
        sRef.sendKeys('10');
        browser.sleep(1200);
        sRef.sendKeys(protractor.Key.ENTER);
        element(by.css('[ng-click="search()"]')).click();
        sRef.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id" and "Description" combination of 2 keywords', function() {
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('qwerta');
        var aId = element(by.model('searchQuery.attributeId'));
        aId.sendKeys('100');
        browser.sleep(500);
        element(by.css('[ng-click="search()"]')).click();
        aId.clear();
        desc.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id", "Description" and "Section" combination of 3 keywords', function() {
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('qwerta');
        var asId = element(by.model('searchQuery.attributeId'));
        asId.sendKeys('100');
        var sRef = element(by.model('searchQuery.sectionRef'));
        sRef.sendKeys('100');
        browser.sleep(1200);
        sRef.sendKeys(protractor.Key.DOWN + protractor.Key.DOWN + protractor.Key.ENTER);
        element(by.css('[ng-click="search()"]')).click();
        asId.clear();
        desc.clear();
        sRef.clear();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Id", "Description" and "Ext Attribute Id" combination of 4 keywords', function() {
        browser.sleep(500);
        var eaId = element(by.model('searchQuery.extAttributeId'));
        eaId.sendKeys('789');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this');
        var asId = element(by.model('searchQuery.attributeId'));
        asId.sendKeys('100');
        var sRef = element(by.model('searchQuery.sectionRef'));
        element(by.css('[ng-click="searchsectionId()"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="search();setSectionList()"]')).click();
        browser.sleep(1000);
        element.all(by.css('[ng-click="getSectionDetails(result)"]')).then(function(items) {
         items[0].click();
        });
        browser.sleep(500);
        element(by.buttonText('Search')).click();
        var result = element.all(by.repeater('attribute in pagedItems[currentPage]'));
        browser.sleep(1000);
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
      browser.sleep(1000);
      element(by.buttonText('Reset')).click();
    });

  });  

  describe('able to', function() {
    it('delete the record when click on ok in modal popup', function() {
      browser.sleep(500);
      var id = element(by.model('searchQuery.attributeId'));
      id.sendKeys('00');
      browser.sleep(500);
      element(by.css('[ng-click="search()"]')).click();
      id.clear();
      browser.sleep(500);
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      element(by.css('[ng-click="ok()"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute removed Succesfully');
      });
      browser.sleep(500);
      element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        items[0].click();
      });
    });

    it('show message when that attribute is add in CG when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.attributeId'));
      aId.sendKeys('1000');
      browser.sleep(500);
      element(by.css('[ng-click="search()"]')).click();
      aId.clear();
      browser.sleep(500);
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      browser.sleep(500);
      var btn = element(by.css('[ng-click="ok()"]'));
      btn.sendKeys(protractor.Key.ENTER);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('this attribute is assigned in classification group, so can not be deleted.');
      });
      browser.sleep(500);
      element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        items[0].click();
      });
    });

    it('go to edit page of the record when click on particular record row', function() {
      var asId = element(by.model('searchQuery.attributeId'));
      asId.sendKeys('90');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      browser.sleep(1000);
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('/attributes');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Attribute');
      });
      browser.sleep(1000);
    });
  });

});