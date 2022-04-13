import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('user')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post()
    public criaUsuario(@Body() usuario) {
        const usuarioCriado = this.usuarioService.criaUsuario(usuario);
        return usuarioCriado;
    }
}
