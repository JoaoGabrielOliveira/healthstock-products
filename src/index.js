import cors from 'cors';
import express from "express";
import "reflect-metadata";
import { Enviroment as env, SendEvent, StartDatabase } from "./config/index.js";
import router from './Routes.js';


//Esse import é a mesma coisa de usar o require
//const express = require("express");
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
/** Log all request */
app.use( (req, res, next) => SendEvent(`${req.method} ${req.url}`, {}).then( () => next()).catch( () => next()) );

app.get('/', (req,res) => res.status(200).send({"message":"The service is working"}))
app.use('/', router);

StartDatabase();

app.listen(env.PORT, env.HOST.split("//")[1], () => {
    console.log("Iniciando HealthStock Products: ", `${env.HOST}:${env.PORT}`);
})

