import { Cliente } from "./client.model";
import { Cachorro } from './cachorro.model';
import { Veterinario } from './veterinario.model';
import { racaImage } from "./racaImage.model";

export interface Atendimento {
    idAtendimento?: number,
    data: Date,
    diagnostico: string,
    comentarios: string,
    clienteId?: number,
    cliente?: Cliente,
    cachorroId?: number,
    cachorro?: Cachorro,
    veterinarioId?: number,
    veterinario?: Veterinario,
    racaImage?: racaImage
}