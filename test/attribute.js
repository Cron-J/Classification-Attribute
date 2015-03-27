var Attribute   = require('../server/models/Attribute').Attribute,
    Config = require('../server/config/testConfig').Attribute;

/** Attribute test case*/
describe('Attribute', function(){
  describe('Attribute CRUD operations', function(){
    
      /** Attribute create*/
      it('Attribute create', function(done){
        var attribute = new Attribute(Config.createAttribute);
        attribute.save(function(err,res){
          if(err) done();
          else done();
        });
      });
      
      /** getAll Attribute*/    
	    it('Attribute getAll', function(done){
        Attribute.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one Attribute*/ 
    it('Attribute getById', function(done){
      Attribute.findById(Config.attributeId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
   /**update exisiting Attribute*/
    it('Attribute updateById', function(done){
      Attribute.findById(Config.attributeId,function(err, attribute){
          if (err) return done(err);
          else if(attribute === null)  done();
          else{
              Config.attributefunc(Config.editAttribute, attribute);
              attribute.save(done);
          }
        });
	    });
    
    /**delete Attribute*/
    it('Attribute delete', function(done){
      Attribute.findById(Config.deleteAttribute,function(err, attribute){
          if (err) return done(err);
          else if(attribute === null) done();
          else attribute.remove(done);
        });
	    });

    /**Attribute search by query*/
    it('Attribute search', function(done){
      Attribute.find(Config.searchObj,function(err, attribute){
          if (err) return done(err);
          else done();
        });
      });
    
   /**Attribute exist or not*/
    it('Attribute exist', function(done){
      Attribute.findOne(Config.searchObj,function(err, attribute){
          if (err) return done(err);
          else done();
        });
      });
   });
});
