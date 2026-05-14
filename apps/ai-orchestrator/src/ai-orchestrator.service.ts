import { Injectable } from '@nestjs/common';

@Injectable()
export class AiOrchestratorService {
  getHello(): string {
    return 'Hello World!';
  }
}
