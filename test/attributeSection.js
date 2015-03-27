var AttributeSection   = require('../server/models/attributeSection').AttributeSection,
    Config = require('../server/config/testConfig').AttributeSection;

/** AttributeSection test case*/
describe('AttributeSection', function(){
  describe('AttributeSection CRUD operations', function(){
    
      /** AttributeSection create*/
      it('AttributeSection create', function(done){
        var attributeSection = new AttributeSection(Config.createAttributeSection);
        attributeSection.save(function(err,res){
          if(err) done();
          else done();
        });
      });
      
      /** getAll AttributeSection*/    
	    it('AttributeSection getAll', function(done){
        AttributeSection.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one AttributeSection*/ 
    it('AttributeSection getById', function(done){
      AttributeSection.findById(Config.attributeSectionId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
   /**update exisiting AttributeSection*/
    it('AttributeSection updateById', function(done){
      AttributeSection.findById(Config.attributeSectionId,function(err, attributeSection){
          if (err) return done(err);
          else if(attributeSection === null)  done();
          else{
              Config.attributeSectionfunc(Config.editAttributeSection, attributeSection);
              attributeSection.save(done);
          }
        });
	    });
    
    /**delete AttributeSection*/
    it('AttributeSection delete', function(done){
      AttributeSection.findById(Config.deleteAttributeSection,function(err, attributeSection){
          if (err) return done(err);
          else if(attributeSection === null) done();
          else attributeSection.remove(done);
        });
	    });

    /**AttributeSection search by query*/
    it('AttributeSection search', function(done){
      AttributeSection.find(Config.searchObj,function(err, attributeSection){
          if (err) return done(err);
          else done();
        });
      });
    
   /**AttributeSection exist or not*/
    it('AttributeSection exist', function(done){
      AttributeSection.findOne(Config.searchObj,function(err, attributeSection){
          if (err) return done(err);
          else done();
        });
      });
   });
});
