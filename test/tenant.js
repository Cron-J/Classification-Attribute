var Tenant   = require('../server/models/tenant').Tenant,
    Config = require('../server/config/testConfig').Tenant;

/** Tenant test case*/
describe('Tenant', function(){
  describe('Tenant CRUD operations', function(){
    
      /** tenant create*/
      it('tenant create', function(done){
        var tenant = new Tenant(Config.createTenant);
        tenant.save(done);
      });
      
      /** getAll tenant*/    
	    it('tenant getAll', function(done){
        Tenant.find({},function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
    /** get one tenant*/ 
    it('tenant getById', function(done){
      Tenant.findById(Config.tenantId,function(err, res){
          if (err) return done(err);
          done();
        });
	    });
    
   /**update exisiting tenant*/
    it('tenant updateById', function(done){
      Tenant.findById(Config.tenantId,function(err, tenant){
          if (err) return done(err);
          else if(tenant === null)  done();
          else{
              Config.tenantfunc(Config.editTenant, tenant);
              tenant.save(done);
          }
        });
	    });
    
    /**delete tenant*/
    it('tenant delete', function(done){
      Tenant.findById(Config.deleteTenant,function(err, tenant){
          if (err) return done(err);
          else if(tenant === null) done();
          else tenant.remove(done);
        });
	    });

    /**tenant search by name*/
    it('tenant search', function(done){
      Tenant.find(Config.searchObj,function(err, tenant){
          if (err) return done(err);
          else done();
        });
      });
    
   /**tenant exist or not*/
    it('tenant exist', function(done){
      Tenant.findOne(Config.searchObj,function(err, tenant){
          if (err) return done(err);
          else done();
        });
      });
   });
});
