var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'votingapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://heroku_tmdrvpb3:aj6bbdo1br819dvq7doldulp3v@ds019054.mlab.com:19054/heroku_tmdrvpb3'
  },

  test: {
    root: rootPath,
    app: {
      name: 'votingapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://heroku_tmdrvpb3:aj6bbdo1br819dvq7doldulp3v@ds019054.mlab.com:19054/heroku_tmdrvpb3'
  },

  production: {
    root: rootPath,
    app: {
      name: 'votingapp'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://heroku_tmdrvpb3:aj6bbdo1br819dvq7doldulp3v@ds019054.mlab.com:19054/heroku_tmdrvpb3'
  }
};

module.exports = config[env];
