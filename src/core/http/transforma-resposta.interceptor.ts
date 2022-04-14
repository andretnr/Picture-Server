import { NestResponse } from './nest-response';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformaRespostaInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adpterHost: HttpAdapterHost) {
        this.httpAdapter = adpterHost.httpAdapter;
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next
            .handle()
            .pipe(
                map((repostaDoControlador: NestResponse) => {
                    if (repostaDoControlador instanceof NestResponse) {
                        const contexto = context.switchToHttp();
                        const response = contexto.getResponse();
                        const { headers, status, body } = repostaDoControlador;

                        const nomeDosCabecalhos = Object.getOwnPropertyNames(headers);

                        nomeDosCabecalhos.forEach( nomeDoCabecalho => {
                            const valorDoCabecalho = headers[nomeDoCabecalho];
                            this.httpAdapter.setHeader(response, nomeDoCabecalho, valorDoCabecalho);
                        });
                        this.httpAdapter.status(response, status);
                        return body;
                    }
                    return repostaDoControlador;
                })
            )
    }
}