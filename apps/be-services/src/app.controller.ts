import { CallHandler, Controller, ExecutionContext, Get, Header, Injectable, NestInterceptor, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getHello(@Res() res:Response): object {
    return res.status(200).json({msg:this.appService.getHello()});
  }
}

@Injectable()
export class ExampleInterceptor implements NestInterceptor{
  constructor(private reflector: Reflector){}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    
    const ctx = context.switchToHttp()
    const requestObj = ctx.getRequest()
    console.log('mika handleraa...',requestObj.headers)
    return next.handle()
  }
}