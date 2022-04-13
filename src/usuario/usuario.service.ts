import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {

    private usuarios = [];

    constructor(private usuarioService: UsuarioService){}
    
    public criaUsuario(usuario) {
        this.usuarios.push(usuario);
        return usuario;
    }
}
