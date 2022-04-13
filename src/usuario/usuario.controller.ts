import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('user')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    public criaUsuario(@Body() usuario: Usuario) {
        const usuarioCriado = this.usuarioService.criaUsuario(usuario);
        return usuarioCriado;
    }

    @Get(':nomeDeUsuario')
    public buscarNomeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string) {
        const usuarioEncontrado = this.usuarioService.buscaPorUsuario(nomeDeUsuario);
        return usuarioEncontrado;
    }
}
