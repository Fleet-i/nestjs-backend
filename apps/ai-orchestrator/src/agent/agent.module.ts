import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  //imports:[ConfigModule.forRoot()],
  providers: [AgentService],
  controllers: [AgentController]
})
export class AgentModule {}
