import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "./is-nome-de-usuario-unico.validator";

export class Usuario {

    id: number;

    @Expose({
        name: 'userName'
    })
    @IsNomeDeUsuarioUnico({
        message: 'Este usuário já existe'
    })
    @IsString({
        message: 'Precisa ser String'
    })
    @IsNotEmpty({
        message: 'Nome de usuario é obrigatório'
    })
    nomeDeUsuario: string;

    @Expose({
        name: 'email'
    })
    @IsEmail({}, {
        message: 'E-mail está incorreto'
    })
    email: string;

    @Expose({
        name: 'password'
    })
    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty()
    senha: string;

    @Expose({
        name: 'fullName'
    })
    @IsNotEmpty({
        message: 'Nome completo é obrigatório'
    })
    @IsString()
    nomeCompleto: string;

    @Expose({
        name: 'joinDate'
    })
    dataEntrada: Date;
}