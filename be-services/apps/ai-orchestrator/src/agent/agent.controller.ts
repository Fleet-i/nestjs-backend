import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AgentService, EventEncoder } from './agent.service';
import type { RunAgentInput } from '@ag-ui/core';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}
  
  @Post()
  async runAgent(
    @Body() input: RunAgentInput,
    @Res() res: Response,
  ) {
    const encoder = new EventEncoder();
    
    // Set SSE headers
    res.setHeader('Content-Type', encoder.getContentType());
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    
    res.status(HttpStatus.OK);
    
    // Stream events
    try {
      for await (const event of this.agentService.runAgent(input)) {
        res.write(event);
      }
    } catch (error) {
      console.error('Error streaming agent response:', error);
    } finally {
      res.end();
    }
  }
}