const dotenv = require("dotenv").config();

const ecosystem = {
  apps: [
    {
      name: "HeckFireBot",
      script: "./bin/index.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    development: {
      user: dotenv.DEVELOPMENT_USER,
      host: dotenv.DEVELOPMENT_HOST,
      ref: dotenv.DEVELOPMENT_REF,
      repo: dotenv.DEVELOPMENT_REPO,
      path: dotenv.DEVELOPMENT_PATH,
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env development"
    },
    production: {
      user: dotenv.PRODUCTION_USER,
      host: dotenv.PRODUCTION_HOST,
      ref: dotenv.PRODUCTION_REF,
      repo: dotenv.PRODUCTION_REPO,
      path: dotenv.PRODUCTION_PATH,
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};

module.exports = ecosystem;
