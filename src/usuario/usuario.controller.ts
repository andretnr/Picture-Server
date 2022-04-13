import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('users')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    public criaUsuario(@Body() usuario: Usuario): Usuario {
                return this.usuarioService.criaUsuario(usuario);
        
    }

    @Get(':nomeDeUsuario')
    public buscarNomeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string): Usuario {
        return this.usuarioService.buscaPorUsuario(nomeDeUsuario);
    }
}
