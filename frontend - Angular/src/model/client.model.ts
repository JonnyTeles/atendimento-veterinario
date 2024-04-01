import { Cachorro } from 'src/model/cachorro.model';
import { Atendimento } from './atendimento.model';

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    cachorros?: Cachorro[];
    atendimento?: Atendimento[];
}