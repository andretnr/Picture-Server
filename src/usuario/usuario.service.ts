import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {

    private usuarios = [];

    public criaUsuario({ usuario }: { usuario; }): Usuario {
        this.usuarios.push(usuario);
        return usuario;
    }

    public buscaPorUsuario({ nomeDeUsuario }: { nomeDeUsuario: string; }): Usuario {
        return this.usuarios.find(usuario => usuario.nomeDeUsuario = nomeDeUsuario);
    }

}
