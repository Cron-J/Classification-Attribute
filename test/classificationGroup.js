var ClassificationGroup   = require('../server/models/classificationGroup').ClassificationGroup,
    Config = require('../server/config/testConfig').ClassificationGroup;

/** ClassificationGroup test case*/
describe('ClassificationGroup', function(){
  describe('ClassificationGroup CRUD operations', function(){
    
      /** ClassificationGroup create*/
      it('ClassificationGroup create', function(done){
        var classificationGroup = new ClassificationGroup(Config.createClassificationGroup);
        classificationGroup.save(function(err,res){
          if(err) done();
          else done();
        });
      });
      
      /** getAll ClassificationGroup*/    
	    it('ClassificationGroup getAll', function(done){
        ClassificationGroup.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one ClassificationGroup*/ 
    it('ClassificationGroup getById', function(done){
      ClassificationGroup.findById(Config.ClassificationGroupId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
   /**update exisiting ClassificationGroup*/
    it('ClassificationGroup updateById', function(done){
      ClassificationGroup.findById(Config.ClassificationGroupId,function(err, ClassificationGroup){
          if (err) return done(err);
          else if(ClassificationGroup === null)  done();
          else{
              Config.ClassificationGroupfunc(Config.editClassificationGroup, ClassificationGroup);
              ClassificationGroup.save(done);
          }
        });
	    });
    
    /**delete ClassificationGroup*/
    it('ClassificationGroup delete', function(done){
      ClassificationGroup.findById(Config.deleteClassificationGroup,function(err, ClassificationGroup){
          if (err) return done(err);
          else if(ClassificationGroup === null) done();
          else ClassificationGroup.remove(done);
        });
	    });

    /**ClassificationGroup search by query*/
    it('ClassificationGroup search', function(done){
      ClassificationGroup.find(Config.searchObj,function(err, ClassificationGroup){
          if (err) return done(err);
          else done();
        });
      });
    
   /**ClassificationGroup exist or not*/
    it('ClassificationGroup exist', function(done){
      ClassificationGroup.findOne(Config.searchObj,function(err, ClassificationGroup){
          if (err) return done(err);
          else done();
        });
      });
   });
});
