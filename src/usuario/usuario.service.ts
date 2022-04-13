import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {

    private usuarios = [{
        id: 1,
        nomeDeUsuario: 'andre',
        email: 'andre@email.com',
        senha: '123456',
        nomeCompleto: 'andre nome',
        dataEntrada: new Date()

    }];

    public criaUsuario(usuario) {
        this.usuarios.push(usuario);
        return usuario;
    }

    public buscaPorUsuario(nomeDeUsuario: string): Usuario {
        return this.usuarios.find(usuario => usuario.nomeDeUsuario = nomeDeUsuario);
    }

}
