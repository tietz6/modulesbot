const express = require('express');
const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('./config.json');

const app = express();
const PORT = config.server.port || 3000;
const HOST = config.server.host || 'localhost';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Module storage
const modules = {};

// Function to load modules
function loadModules() {
  const modulesDir = path.join(__dirname, 'modules');
  
  if (!fs.existsSync(modulesDir)) {
    console.log('Modules directory not found, creating it...');
    fs.mkdirSync(modulesDir, { recursive: true });
    return;
  }

  const moduleFiles = fs.readdirSync(modulesDir).filter(file => file.endsWith('.js'));
  
  console.log(`Loading ${moduleFiles.length} module(s)...`);
  
  moduleFiles.forEach(file => {
    try {
      const moduleName = path.basename(file, '.js');
      const modulePath = path.join(modulesDir, file);
      const module = require(modulePath);
      
      if (typeof module.init === 'function') {
        module.init(app, modules);
        modules[moduleName] = module;
        console.log(`✓ Loaded module: ${moduleName}`);
      } else {
        console.warn(`✗ Module ${moduleName} has no init function`);
      }
    } catch (error) {
      console.error(`✗ Error loading module ${file}:`, error.message);
    }
  });
}

// Base route
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'ModulesBot Server is active',
    modules: Object.keys(modules),
    endpoints: [
      'GET / - This status page',
      'GET /modules - List all loaded modules',
      'GET /health - Health check'
    ]
  });
});

// Module list endpoint
app.get('/modules', (req, res) => {
  const moduleList = Object.keys(modules).map(name => ({
    name,
    info: modules[name].info || 'No description'
  }));
  
  res.json({
    count: moduleList.length,
    modules: moduleList
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Load modules if enabled
if (config.modules.enabled && config.modules.autoload) {
  loadModules();
}

// Start server
app.listen(PORT, HOST, () => {
  console.log('=================================');
  console.log('  ModulesBot Server Started');
  console.log('=================================');
  console.log(`Server: http://${HOST}:${PORT}`);
  console.log(`Modules loaded: ${Object.keys(modules).length}`);
  console.log('=================================');
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
