import {  Router } from "express";
import { getRacasPorNome, getTodasRacas, getRacasPorId } from "../racas/dogApi";

const dogApi = Router();

dogApi.get('/nome/:name', getRacasPorNome.getRacasPorNome);
dogApi.get('/all', getTodasRacas.getTodasRacas);
dogApi.get('/id/:id', getRacasPorId.getRacasPorId);



export { dogApi }