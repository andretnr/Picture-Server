import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "./is-nome-de-usuario-unico.validator";

export class Usuario {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNomeDeUsuarioUnico({
        message: 'Este usuário já existe'
    })
    nomeDeUsuario: string;

    @IsNotEmpty()
    @IsEmail({}, {
        message: 'E-mail está incorreto'
    })
    email: string;

    @IsNotEmpty()
    senha: string;

    @IsNotEmpty({
        message: 'Nome completo é obrigatório'
    })
    @IsString()
    nomeCompleto: string;

    dataEntrada: Date;
}