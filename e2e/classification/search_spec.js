'use strict';

describe('Classification search page', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    this.title = browser.getTitle();
    browser.get('http://localhost:3036/#/');
    browser.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[2].click();
    });
    expect(browser.getCurrentUrl()).toContain('/classifications');
    browser.sleep(500);   
  });

  afterEach(function() {
    browser.sleep(500);
  })
  describe('able to get', function() {
    it('page headings', function(){   
      element.all(by.tagName('h1')).then(function(items) {
        expect(items[0].getText()).toBe('Classification');
      });
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[0].getText()).toBe('Search Classification');
      });   
    })

    it('all search results when directly click on search button', function() {
       element(by.css('[ng-click="search();filtered();"]')).click();
    });

    describe('search results with', function() {
      it('"Classification Id" as keyword', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('900');
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Long Description" as keyword', function() {
        var ld = element(by.model('searchQuery.descLong'));
        ld.sendKeys('this is long description');
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Type" as keyword', function() {
        element.all(by.buttonText('None selected')).then(function(items) {
          items[0].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[0].sendKeys('pro'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        element(by.buttonText('Search')).click();
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
        browser.sleep(200);
      });

      it('"Short Description" as keyword', function() {
        var sd = element(by.model('searchQuery.descShort'));
        sd.sendKeys('this is short description');
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Version No" as keyword', function() {
        var vNo = element(by.model('searchQuery.versionNo'));
        vNo.sendKeys('200');
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Tenant Name" from type a head as keyword', function() {
        var tRef = element(by.model('searchQuery.tenantRef'));
        tRef.sendKeys('tenan');
        browser.sleep(1200);
        tRef.sendKeys(protractor.Key.ENTER);
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
      });

      it('"Classification Id" and "Short Description" combination of 2 keywords', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('100');
        var sdesc = element(by.model('searchQuery.descShort'));
        sdesc.sendKeys('his is short description');
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Classification Id", "Long Description" and "Tenant Name" combination of 3 keywords', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('100');
        var ldesc = element(by.model('searchQuery.descLong'));
        ldesc.sendKeys('this is long description');
        var sRef = element(by.model('searchQuery.tenantRef'));
        sRef.sendKeys('tenan');
        browser.sleep(1200);
        sRef.sendKeys(protractor.Key.DOWN + protractor.Key.DOWN + protractor.Key.ENTER);
        element(by.css('[ng-click="search();filtered();"]')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(1000);
        element(by.buttonText('Reset')).click();
      });

      it('"Classification Id", "Long Description", "Tenant Name" and "Version No" combination of 4 keywords', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('100');
        var ldesc = element(by.model('searchQuery.descLong'));
        ldesc.sendKeys('this');
        var vNo = element(by.model('searchQuery.versionNo'));
        vNo.sendKeys('200');
        var tRef = element(by.model('searchQuery.tenantRef'));
        element(by.css('[ng-click="searchTenant()"]')).click();
        browser.sleep(100);
        element(by.css('[ng-click="searchTenantDetails();setTenantList()"]')).click();
        browser.sleep(500);
        element.all(by.css('[ng-click="getTenantDetails(result)"]')).then(function(items) {
         items[0].click();
        });
        browser.sleep(500);
        element(by.buttonText('Search')).click();
        browser.sleep(300);
        element(by.buttonText('Reset')).click();
        browser.sleep(200);
      });

      it('"Classification Id", "Long Description", "Type" , "Short Description" and "Version No" combination of 5 keywords', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('100');
        var ldesc = element(by.model('searchQuery.descLong'));
        ldesc.sendKeys('this');
        element.all(by.buttonText('None selected')).then(function(items) {
          items[0].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[0].sendKeys('e'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        var sdesc = element(by.model('searchQuery.descShort'));
        sdesc.sendKeys('this is short description');
        browser.sleep(100);
        var vNo = element(by.model('searchQuery.versionNo'));
        vNo.sendKeys('200');
        element(by.buttonText('Search')).click();
        browser.sleep(500);
        element(by.buttonText('Reset')).click();
        browser.sleep(200);
      });
    it('"Classification Id", "Long Description", "Type" , "Short Description", "Version No" and "Type" combination of 6 keywords', function() {
        var cId = element(by.model('searchQuery.classificationId'));
        cId.sendKeys('100');
        var ldesc = element(by.model('searchQuery.descLong'));
        ldesc.sendKeys('this');
        element.all(by.buttonText('None selected')).then(function(items) {
          items[0].click();
        }); 
        element.all(by.model('inputLabel.labelFilter')).then(function(items) {
          items[0].sendKeys('eC'+protractor.Key.DOWN+protractor.Key.DOWN);
        });
        browser.sleep(200);
        element.all(by.css('.multiSelectFocus')).then(function(items) {
            items[0].click();
        });
        browser.sleep(200);
        var sdesc = element(by.model('searchQuery.descShort'));
        sdesc.sendKeys('this is short description');
        var vNo = element(by.model('searchQuery.versionNo'));
        vNo.sendKeys('200');
        var tRef = element(by.model('searchQuery.tenantRef'));
        element(by.css('[ng-click="searchTenant()"]')).click();
        browser.sleep(100);
        element(by.css('[ng-click="searchTenantDetails();setTenantList()"]')).click();
        browser.sleep(500);
        element.all(by.css('[ng-click="getTenantDetails(result)"]')).then(function(items) {
         items[1].click();
        });
        browser.sleep(500);
        element(by.buttonText('Search')).click();
        var result = element.all(by.repeater('classification in pagedItems[currentPage]'));
        browser.sleep(200);
        element(by.buttonText('Reset')).click();
        browser.sleep(200);
      });
    });

    it('0 search result message when no record is found', function() {
      var aId = element(by.model('searchQuery.classificationId'));
      aId.sendKeys('1000');
      var eaId = element(by.model('searchQuery.versionNo'));
      eaId.sendKeys('111');
      element(by.buttonText('Search')).click();
      browser.sleep(1000);
      element(by.buttonText('Reset')).click();
    });

  });  

  describe('able to', function() {
    it('delete the record when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.classificationId'));
      aId.sendKeys('60');
      element(by.buttonText('Search')).click();
      aId.clear();
      browser.sleep(300);
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      browser.sleep(500);
      element(by.css('[ng-click="ok()"]')).click();
      browser.sleep(100);
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('Classification removed Succesfully');
      });
      browser.sleep(300);
      element.all(by.css('[ng-click="deleteMessage(message)"]')).then(function(items) { 
        items[0].click();
      });
      browser.sleep(100);
    });

    it('do not delete the record when click on ok in modal popup', function() {
      var aId = element(by.model('searchQuery.classificationId'));
      aId.sendKeys('60');
      element(by.buttonText('Search')).click();
      aId.clear();
      browser.sleep(300);
      element.all(by.buttonText('Delete')).then(function(items) {
        items[0].click();
      });
      element(by.css('[ng-click="cancel()"]')).click();
      browser.sleep(100);
    });

    it('go to edit page of the record when click on particular record row', function() {
      var asId = element(by.model('searchQuery.classificationId'));
      asId.sendKeys('90');
      element(by.buttonText('Search')).click();
      asId.clear();
      browser.sleep(300);
      element.all(by.tagName('td')).then(function(rows) {
          rows[1].click();
      });
      expect(browser.getCurrentUrl()).toContain('/classifications');
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[2].getText()).toBe('Edit Classification');
      });
      browser.sleep(1000);
    });
  });

});