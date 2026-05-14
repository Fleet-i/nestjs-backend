import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      'msg':'KKjHello World from AppService!'
    };
  }
}
