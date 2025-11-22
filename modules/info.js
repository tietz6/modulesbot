// Info module - Provides system information

module.exports = {
  info: 'System information module',
  
  init: function(app, modules) {
    // System info endpoint
    app.get('/info', (req, res) => {
      res.json({
        module: 'info',
        system: {
          platform: process.platform,
          nodeVersion: process.version,
          memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
          },
          uptime: Math.round(process.uptime()) + ' seconds'
        },
        server: {
          loadedModules: Object.keys(modules).length
        }
      });
    });
    
    console.log('  - Registered: GET /info');
  }
};
