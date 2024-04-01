import { Router } from "express";
import { DeleteAtendimentoPorIdController } from "../atendimentos/deleteAtendimentos/DeleteAtendimentoPorIdController";
import { GetAllAtendimentosController } from "../atendimentos/getAtendimentos/GetAllAtendimentosController";
import { GetAtendimentosPorIdController } from "../atendimentos/getAtendimentos/GetAtendimentosPorIdController";
import { PatchAtendimentosController } from "../atendimentos/patchAtendimentos/PatchAtendimentosController";
import { PostAtendimentosController } from "../atendimentos/postAtendimentos/PostAtendimentosController";
import { auth } from "../middlewares/auth";
import { onlyYour, onlyYourAtendimento, roleVeterinario } from "../middlewares/permissions";

const postAtendimentos = new PostAtendimentosController();
const getAllAtendimentos = new GetAllAtendimentosController();
const getAtendimentosPorId = new GetAtendimentosPorIdController();
const deleteAtendimentoPorId = new DeleteAtendimentoPorIdController();
const patchAtendimentos = new PatchAtendimentosController();


const atendimentoRoutes = Router();

atendimentoRoutes.post('/post', auth(), roleVeterinario(),   postAtendimentos.handle);
atendimentoRoutes.get('/all', auth(), roleVeterinario(),   getAllAtendimentos.handle);
atendimentoRoutes.get('/', auth(), onlyYourAtendimento(), getAtendimentosPorId.handle);
atendimentoRoutes.delete('/delete', auth(), roleVeterinario(),  deleteAtendimentoPorId.handle);
atendimentoRoutes.patch('/update', auth(), roleVeterinario(),   patchAtendimentos.handle);

export { atendimentoRoutes }