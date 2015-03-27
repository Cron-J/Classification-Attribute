'use strict';

describe('Attribute Section search page', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    browser.get('http://localhost:3036/#/');
    ptor.sleep(500);   
  });

  afterEach(function() {

  })
  describe('able to get', function() {
    it('page headings', function(){   
      element.all(by.tagName('h1')).then(function(items) {
        expect(items[0].getText()).toBe('Attribute Sections');
      });
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[0].getText()).toBe('Search Attribute Section');
      });
    })

    it('all search results when directly click on search button', function() {
       element(by.css('[ng-click="search()"]')).click();
    });

    describe('search results with', function() {
      it('"Attribute Section Id" as keyword', function() {
        var asId = element(by.model('searchQuery.attributeSectionId'));
        asId.sendKeys('100');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Name" as keyword', function() {
        var name = element(by.model('searchQuery.name'));
        name.sendKeys('sa');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Description" as keyword', function() {
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this is the description');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Section Id" and "Description" combination of 2 keywords', function() {
        var asId = element(by.model('searchQuery.attributeSectionId'));
        asId.sendKeys('1000');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Section Id" and "Name" combination of 2 keywords', function() {
        var asId = element(by.model('searchQuery.attributeSectionId'));
        asId.sendKeys('100');
        var name = element(by.model('searchQuery.name'));
        name.sendKeys('fag');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Attribute Section Id", "Description" and "Name" combination of 3 keywords', function() {
        var asId = element(by.model('searchQuery.attributeSectionId'));
        asId.sendKeys('1000');
        var desc = element(by.model('searchQuery.description'));
        desc.sendKeys('this');
        var name = element(by.model('searchQuery.name'));
        name.sendKeys('this is');
        element(by.css('[ng-click="search()"]')).click();
        var result = element.all(by.repeater('attributeSection in pagedItems[currentPage]'));
        ptor.sleep(1000);
        element(by.buttonText('Reset')).click();
      });
    });

    it('0 search result message when no record is found', function() {
      var asId = element(by.model('searchQuery.attributeSectionId'));
      asId.sendKeys('1000');
      var desc = element(by.model('searchQuery.description'));
      desc.sendKeys('this');
      var name = element(by.model('searchQuery.name'));
      name.sendKeys('fasd');
      element(by.css('[ng-click="search()"]')).click();

      element.all(by.tagName('h3')).then(function(items) {
        expect(items[1].getText()).toBe('Found 0 entry');
      });
      ptor.sleep(1000);
      element(by.buttonText('Reset')).click();
    });

  });  

  describe('able to', function() {
    it('delete the record when click on ok in modal popup', function() {
      var asId = element(by.model('searchQuery.attributeSectionId'));
      asId.sendKeys('60');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
      element(by.css('[ng-click="ok()"]')).click();
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Attribute Section removed Succesfully');
      });
      ptor.sleep(500);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
    });

    it('do not delete the record when click on ok in modal popup', function() {
      var asId = element(by.model('searchQuery.attributeSectionId'));
      asId.sendKeys('60');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      element(by.css('[ng-click="cancel()"]')).click();
      ptor.sleep(1000);
    });

    it('go to edit page of the record when click on particular record row', function() {
      var asId = element(by.model('searchQuery.attributeSectionId'));
      asId.sendKeys('90');
      element(by.css('[ng-click="search()"]')).click();
      asId.clear();
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('#/');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Attribute Section');
      });
      ptor.sleep(1000);
    });
  });

});