import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adpterHost: HttpAdapterHost) {
        this.httpAdapter = adpterHost.httpAdapter;
    }
    catch(exception: Error, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const req = contexto.getRequest();
        const resp = contexto.getResponse();

        const { status, body } = exception instanceof HttpException ? {
            status: exception.getStatus(),
            body: exception.getResponse
        } :
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toString(),
                    message: exception.message,
                    path: req.path
                }
            };
        this.httpAdapter.reply(resp, body, status);
    }

}