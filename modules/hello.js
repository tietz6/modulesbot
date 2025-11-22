// Hello module - A simple greeting module

module.exports = {
  info: 'Simple greeting module',
  
  init: function(app, modules) {
    // Register routes
    app.get('/hello', (req, res) => {
      const name = req.query.name || 'World';
      res.json({
        message: `Hello, ${name}!`,
        module: 'hello'
      });
    });
    
    app.post('/hello', (req, res) => {
      const name = req.body.name || 'World';
      res.json({
        message: `Hello, ${name}! (via POST)`,
        module: 'hello'
      });
    });
    
    console.log('  - Registered: GET /hello');
    console.log('  - Registered: POST /hello');
  }
};
