import { Module } from '@nestjs/common';
import { AiOrchestratorController } from './ai-orchestrator.controller';
import { AiOrchestratorService } from './ai-orchestrator.service';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    //ConfigModule.forRoot(),
    AgentModule
  ],
  controllers: [AiOrchestratorController],
  providers: [AiOrchestratorService],
})
export class AiOrchestratorModule {}
