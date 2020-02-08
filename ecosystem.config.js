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
      user: process.env.DEVELOPMENT_USER,
      host: process.env.DEVELOPMENT_HOST,
      ref: process.env.DEVELOPMENT_REF,
      repo: process.env.DEVELOPMENT_REPO,
      path: process.env.DEVELOPMENT_PATH
      // "pre-deploy-local" : "echo 'This is a local executed command'",
      // "post-deploy":
      //   "npm install && pm2 reload ecosystem.config.js --env development"
    },
    production: {
      user: process.env.PRODUCTION_USER,
      host: process.env.PRODUCTION_HOST,
      ref: process.env.PRODUCTION_REF,
      repo: process.env.PRODUCTION_REPO,
      path: process.env.PRODUCTION_PATH
      // "pre-deploy-local": "echo 'This is a local executed command'",
      // "post-deploy":
      //   "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};

console.log(ecosystem);

module.exports = ecosystem;
