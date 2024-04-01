import { Router } from "express";
import { DeleteVeterinariosByIdController } from "../veterinarios/deleteVeterinarios/DeleteVeterinariosByIdController";
import { GetAllVeterinariosController } from "../veterinarios/getVeterinarios/GetAllVeterinariosController";
import { GetVeterinariosByIdController } from "../veterinarios/getVeterinarios/GetVeterinariosByIdController";
import { UpdateVeterinarioController } from "../veterinarios/patchVeterinarios/UpdateVeterinarioController";
import { PostVeterinariosController } from "../veterinarios/postVeterinarios/PostVeterinariosController";
import { auth } from "../middlewares/auth";
import { onlyYour, roleVeterinario } from "../middlewares/permissions";
import { ResetPasswordController } from "../login/resetPassword/resetPasswordController";

const postVeterinarios = new PostVeterinariosController();
const getAllVeterinarios = new GetAllVeterinariosController();
const getVeterianriosById = new GetVeterinariosByIdController();
const updateVeterinarios = new UpdateVeterinarioController();
const deleteVeterinario = new DeleteVeterinariosByIdController();


const veterinarioRoutes = Router();

veterinarioRoutes.post('/post', auth(), roleVeterinario(), postVeterinarios.handle);
veterinarioRoutes.get('/all', auth(), roleVeterinario(), getAllVeterinarios.handle);
veterinarioRoutes.get('/', auth(), roleVeterinario(), getVeterianriosById.handle);
veterinarioRoutes.patch('/update', auth(), roleVeterinario(), updateVeterinarios.handle);
veterinarioRoutes.delete('/delete', auth(), roleVeterinario(), deleteVeterinario.handle);

export { veterinarioRoutes }