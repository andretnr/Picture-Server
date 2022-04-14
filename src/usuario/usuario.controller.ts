import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { NestResponse } from './../core/http/nest-response';
import { Body, Controller, Get, Param, Post, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('users')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Post()
    public criaUsuario(@Body() usuario: Usuario): NestResponse {
        const usuarioCriado = this.usuarioService.criaUsuario(usuario);
        return new NestResponseBuilder()
            .comStatus(HttpStatus.CREATED)
            .comHeaders({
                'location': `/users/${usuarioCriado.nomeDeUsuario}`
            })
            .comBody(usuarioCriado)
            .build()
    }

    @Get(':nomeDeUsuario')
    public buscarNomeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string): Usuario {
        const usuarioEncontrado = this.usuarioService.buscaPorNomeUsuario(nomeDeUsuario);
        if(!usuarioEncontrado){
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'usuário não encontrado'
            });
        }
        return usuarioEncontrado;
    }
}
