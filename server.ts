import {protect} from "./modules/auth";

const express = require('express')
import Router from './router';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'))
app.use('/api', protect, Router)

module.exports = app;