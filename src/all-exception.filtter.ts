import { Catch, ArgumentMetadata, HttpStatus, HttpException, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";


type MyResponseObj = {
      statuscode: number,
      timestamp: string,
      path: string,
      response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService
    (AllExceptionsFilter.name)

        catch(exception: unknown, host: ArgumentsHost){
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();

            const myRsponseObj: MyResponseObj = {
                    statuscode: 500,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    response: '',
            }

            if( exception instanceof HttpException) {
                myRsponseObj.statuscode = exception.getStatus()
                myRsponseObj.response = exception.getResponse()
            } else if (exception instanceof PrismaClientValidationError){
                myRsponseObj.statuscode = 422
                myRsponseObj.response = exception.message.replaceAll(/\n/g, '')
            } else {
                myRsponseObj.statuscode = HttpStatus.INTERNAL_SERVER_ERROR
                myRsponseObj.response = 'Internal Server Error'
            }

            response.status(myRsponseObj.statuscode).json(myRsponseObj)

            this.logger.error(myRsponseObj.response, AllExceptionsFilter.name)

            super.catch(exception, host)

    }
}
