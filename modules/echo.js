// Echo module - Echoes back the received message

module.exports = {
  info: 'Echo module - returns what you send',
  
  init: function(app, modules) {
    // Echo endpoint
    app.post('/echo', (req, res) => {
      res.json({
        echo: req.body,
        timestamp: new Date().toISOString(),
        module: 'echo'
      });
    });
    
    app.get('/echo', (req, res) => {
      res.json({
        echo: req.query,
        timestamp: new Date().toISOString(),
        module: 'echo'
      });
    });
    
    console.log('  - Registered: GET /echo');
    console.log('  - Registered: POST /echo');
  }
};
