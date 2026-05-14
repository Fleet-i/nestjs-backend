import { Test, TestingModule } from '@nestjs/testing';
import { AiOrchestratorController } from './ai-orchestrator.controller';
import { AiOrchestratorService } from './ai-orchestrator.service';

describe('AiOrchestratorController', () => {
  let aiOrchestratorController: AiOrchestratorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AiOrchestratorController],
      providers: [AiOrchestratorService],
    }).compile();

    aiOrchestratorController = app.get<AiOrchestratorController>(AiOrchestratorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(aiOrchestratorController.getHello()).toBe('Hello World!');
    });
  });
});
