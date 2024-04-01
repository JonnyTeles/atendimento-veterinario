import { Cliente } from './client.model';
import { Raca } from './raca.model';

export interface Cachorro {
    id?: number
    nome: string
    racaId: number
    sexo: string
    cor: string
    idade: number
    peso: number
    clienteId: number
    tutor?: Cliente
    raca?: Raca
    reference_image_id?: string
}