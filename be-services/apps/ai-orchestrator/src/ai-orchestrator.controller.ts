import { Controller, Get } from '@nestjs/common';
import { AiOrchestratorService } from './ai-orchestrator.service';

@Controller()
export class AiOrchestratorController {
  constructor(private readonly aiOrchestratorService: AiOrchestratorService) {}

  @Get()
  getHello(): string {
    return this.aiOrchestratorService.getHello();
  }
}
