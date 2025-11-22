# ModulesBot

A lightweight, modular bot server application built with Node.js and Express.

## Features

- 🔌 **Modular Architecture**: Easy-to-extend plugin system
- 🚀 **Simple Setup**: Just install and run
- ⚙️ **Configurable**: JSON-based configuration
- 🔥 **Hot-loadable**: Add modules without restarting (with modification)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tietz6/modulesbot.git
cd modulesbot
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start at `http://localhost:3000`

## Configuration

Edit `config.json` to customize your server:

```json
{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "modules": {
    "enabled": true,
    "autoload": true
  }
}
```

## API Endpoints

### Core Endpoints

- `GET /` - Server status and information
- `GET /modules` - List all loaded modules
- `GET /health` - Health check endpoint

### Module Endpoints

The following endpoints are provided by default modules:

#### Hello Module
- `GET /hello?name=YourName` - Get a greeting
- `POST /hello` - Send JSON: `{"name": "YourName"}`

#### Echo Module
- `GET /echo?message=test` - Echo query parameters
- `POST /echo` - Echo request body

#### Info Module
- `GET /info` - Get system information

## Creating Custom Modules

Create a new file in the `modules/` directory:

```javascript
// modules/mymodule.js
module.exports = {
  info: 'Description of your module',
  
  init: function(app, modules) {
    // Register your routes here
    app.get('/myroute', (req, res) => {
      res.json({ message: 'Hello from my module!' });
    });
    
    console.log('  - Registered: GET /myroute');
  }
};
```

The module will be automatically loaded when the server starts.

## Module Structure

Each module should export:
- `info`: A string describing the module
- `init(app, modules)`: A function that receives the Express app and loaded modules

## Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Make sure dependencies are installed: `npm install`

### Modules not loading
- Check that module files are in the `modules/` directory
- Ensure module files have `.js` extension
- Verify module exports an `init` function
- Check server console for error messages

## Development

### Running in development mode
```bash
npm run dev
```

### Project Structure
```
modulesbot/
├── config.json          # Configuration file
├── server.js           # Main server file
├── package.json        # Project dependencies
├── modules/            # Module directory
│   ├── hello.js       # Greeting module
│   ├── echo.js        # Echo module
│   └── info.js        # System info module
└── README.md          # This file
```

## License

MIT

## Support

If you encounter any issues, please check:
1. All dependencies are installed (`npm install`)
2. Port 3000 is available
3. Node.js version is compatible (v14+)
4. Module files are properly formatted

For additional help, create an issue on GitHub.
