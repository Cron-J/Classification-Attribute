var Classification   = require('../server/models/classification').Classification,
    Config = require('../server/config/testConfig').Classification;

/** classification test case*/
describe('Classification', function(){
  describe('Classification CRUD operations', function(){
    
      /** classification create*/
      it('Classification create', function(done){
        var classification = new Classification(Config.createClassification);
        classification.save(function(err,res){
          if(err) done();
          else done();
        });
      });
      
      /** getAll Classification*/    
	    it('Classification getAll', function(done){
        Classification.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one Classification*/ 
    it('Classification getById', function(done){
      Classification.findById(Config.classificationId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
   /**update exisiting Classification*/
    it('Classification updateById', function(done){
      Classification.findById(Config.classificationId,function(err, classification){
          if (err) return done(err);
          else if(classification === null)  done();
          else{
              Config.classificationfunc(Config.editClassification, classification);
              classification.save(done);
          }
        });
	    });
    
    /**delete Classification*/
    it('Classification delete', function(done){
      Classification.findById(Config.deleteClassification,function(err, classification){
          if (err) return done(err);
          else if(classification === null) done();
          else classification.remove(done);
        });
	    });

    /**Classification search by query*/
    it('Classification search', function(done){
      Classification.find(Config.searchObj,function(err, classification){
          if (err) return done(err);
          else done();
        });
      });
    
   /**Classification exist or not*/
    it('Classification exist', function(done){
      Classification.findOne(Config.searchObj,function(err, classification){
          if (err) return done(err);
          else done();
        });
      });
   });
});
