import { Router } from "express";
import { DeleteClientesByIdController } from "../cliente/deleteClientes/DeleteClientesByIdController";
import { GetAllClientesController } from "../cliente/getClientes/GetAllClientesController";
import { GetClientesByIdController } from "../cliente/getClientes/GetClientesByIdController";
import { PostClientesController } from "../cliente/postClientes/PostClientesController";
import { UpdateClientesController } from "../cliente/updateClientes/UpdateClientesController";
import { ResetPasswordController } from "../login/resetPassword/resetPasswordController";
import { auth } from "../middlewares/auth";
import { onlyYour, roleCliente, roleVeterinario } from "../middlewares/permissions";

const postClientes = new PostClientesController();
const getAllClientes = new GetAllClientesController();
const getClientesById = new GetClientesByIdController();
const updateClientes = new UpdateClientesController();
const deleteClientes = new DeleteClientesByIdController();

const clienteRoutes = Router();

clienteRoutes.post('/post', auth(), roleVeterinario(), postClientes.handle);
clienteRoutes.get('/all', auth(), roleVeterinario(), getAllClientes.handle);
clienteRoutes.get('/', auth(), onlyYour(), getClientesById.handle);
clienteRoutes.patch('/update', auth(), roleVeterinario(), updateClientes.handle);
clienteRoutes.delete('/delete', auth(), roleVeterinario(), deleteClientes.handle);


export { clienteRoutes }