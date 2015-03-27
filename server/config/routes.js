/**
 * Add your other routes below.
 * Each model might have a file that declares its
 * routes, such as the Events model.
 *
 * @param server
 */
exports.init = function(server) {
  console.log('Loading routes');
  require('./routes/tenant')(server);
  require('./routes/attributeSection')(server);
  require('./routes/classificationGroup')(server);
  require('./routes/classification')(server);
  require('./routes/attribute')(server);
  require('./routes/status')(server);
 };
