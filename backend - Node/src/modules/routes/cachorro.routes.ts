import { Router } from "express";
import { DeleteCachorrosController } from "../cachorro/deleteCachorros/DeleteCachorrosController";
import { GetAllCachorrosController } from "../cachorro/getCachorros/GetAllCachorrosController";
import { GetCachorosByIdController } from "../cachorro/getCachorros/GetCachorrosByIdController";
import { GetCachorrosByRacaController } from "../cachorro/getCachorros/GetCachorrosByRacaController";
import { PostCachorrosController } from "../cachorro/postCachorros/PostCachorrosController";
import { UpdateCachorrosController } from "../cachorro/updateCachorros/UpdateCachorrosController";
import { auth } from "../middlewares/auth";
import { onlyYour, onlyYourDog, roleVeterinario } from "../middlewares/permissions";

const postCachorros = new PostCachorrosController();
const getAllCachorros = new GetAllCachorrosController();
const getCachorrosById = new GetCachorosByIdController();
const getCachorrosByRaca = new GetCachorrosByRacaController();
const updateCachorros = new UpdateCachorrosController();
const deleteCachorros = new DeleteCachorrosController();
const cachoroRoutes = Router();

cachoroRoutes.post('/post', auth(), roleVeterinario(), postCachorros.handle);
cachoroRoutes.get('/all', auth(), roleVeterinario(), getAllCachorros.handle);
cachoroRoutes.get('/', auth(), onlyYourDog(), getCachorrosById.handle);
cachoroRoutes.get('/raca', getCachorrosByRaca.handle)
cachoroRoutes.patch('/update', auth(), roleVeterinario(), updateCachorros.handle);
cachoroRoutes.delete('/delete', auth(), roleVeterinario(), deleteCachorros.handle);


export { cachoroRoutes }
