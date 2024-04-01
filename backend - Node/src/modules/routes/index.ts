import { Router } from "express";
import { atendimentoRoutes } from "./atendimento.routes";
import { cachoroRoutes } from "./cachorro.routes";
import { clienteRoutes } from "./cliente.routes";
import { loginRoutes } from "./login.routes";
import { dogApi } from "./racas.routes";
import { veterinarioRoutes } from "./veterinario.routes";

const routes = Router();

routes.use("/clientes", clienteRoutes);
routes.use("/cachorros", cachoroRoutes);
routes.use("/veterinarios", veterinarioRoutes);
routes.use("/atendimentos", atendimentoRoutes);
routes.use('/racas', dogApi);
routes.use('/login', loginRoutes);


export { routes }