const day = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '');

const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: 'nodeApiMacFly', // Required
  level: 'debug', // Optional, see "Levels" section
  src: true,
  streams: [{
      level: 'info',
      stream: process.stdout // log INFO and above to stdout
    },
    {
      level: 'error',
      path: `${__dirname}/logs/errors/${day}.log` // log ERROR and above to a file
    },
    {
      level: 'warn',
      path: `${__dirname}/logs/warnings/${day}.log` // log Warning and above to a file
    }
  ]
});

module.exports = logger;