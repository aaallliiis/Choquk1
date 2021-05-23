const app=require('./app');
require('dotenv').config();
global.config=require('./config');
new app();