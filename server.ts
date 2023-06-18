import {protect} from "./modules/auth";

const express = require('express')
import Router from './router';
import morgan from 'morgan';
import {createNewUser, signIn} from "./modules/handlers/user";
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', protect, Router)

app.post('/user', createNewUser)
app.post('/login', signIn)

module.exports = app;