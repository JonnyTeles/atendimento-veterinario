import { Atendimento } from "./atendimento.model"

export interface Veterinario {
    id?: number
    nome: string
    email: string
    senha: string
    cpf: string
    especializacao: string
    Atendimento: Atendimento[]
}