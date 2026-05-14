import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { EventType, RunAgentInput } from '@ag-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { openaiMessages } from './utils3';

export class EventEncoder {
  encode(event: any): string {
    return `data: ${JSON.stringify(event)}\n\n`;
  }
  
  getContentType(): string {
    return 'text/event-stream';
  }
}

@Injectable()
export class AgentService {
  private openai: OpenAI;
  
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPEN_API_KEY');
    if (!apiKey) {
      throw new Error('OPEN_API_KEY is required');
    }
    this.openai = new OpenAI({ apiKey });
  }
  
  async *runAgent(input: RunAgentInput): AsyncGenerator<string> {
    const encoder = new EventEncoder();
    
    try {
      // Emit RUN_STARTED
      yield encoder.encode({
        type: EventType.RUN_STARTED,
        threadId: input.threadId,
        runId: input.runId,
      });
      
      // Convert AG-UI messages to OpenAI format
      // const openaiMessages = input.messages.map((msg) => ({
      //   role: msg.role as 'user' | 'assistant' | 'system',
      //   content: msg.content || '',
      //   ...(msg.role === 'assistant' && msg.toolCalls ? {
      //     tool_calls: msg.toolCalls
      //   } : {}),
      //   ...(msg.role === 'tool' ? {
      //     tool_call_id: msg.toolCallId
      //   } : {})
      // }));
      
      // Convert AG-UI tools to OpenAI format
      const openaiTools = input.tools?.map((tool) => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        },
      })) || [];
      
      // Call OpenAI with streaming
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: openaiMessages(input),
        tools: openaiTools.length > 0 ? openaiTools : undefined,
        stream: true,
      });
      
      const messageId:any = uuidv4();
      let hasStartedMessage = false;
      
      // Stream the response
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        
        // Handle text content
        if (delta?.content) {
          if (!hasStartedMessage) {
            yield encoder.encode({
              type: EventType.TEXT_MESSAGE_START,
              messageId,
              role: 'assistant',
            });
            hasStartedMessage = true;
          }
          
          yield encoder.encode({
            type: EventType.TEXT_MESSAGE_CONTENT,
            messageId,
            delta: delta.content,
          });
        }
        
        // Handle tool calls
        if (delta?.tool_calls) {
          for (const toolCall of delta.tool_calls) {
            if (toolCall.function?.name) {
              yield encoder.encode({
                type: EventType.TOOL_CALL_START,
                toolCallId: toolCall.id,
                toolCallName: toolCall.function.name,
                parentMessageId: messageId,
              });
            }
            
            if (toolCall.function?.arguments) {
              yield encoder.encode({
                type: EventType.TOOL_CALL_ARGS,
                toolCallId: toolCall.id,
                delta: toolCall.function.arguments,
              });
            }
          }
        }
      }
      
      // End message if it was started
      if (hasStartedMessage) {
        yield encoder.encode({
          type: EventType.TEXT_MESSAGE_END,
          messageId,
        });
      }
      
      // Emit RUN_FINISHED
      yield encoder.encode({
        type: EventType.RUN_FINISHED,
        threadId: input.threadId,
        runId: input.runId,
      });
      
    } catch (error: any) {
      // Emit RUN_ERROR
      yield encoder.encode({
        type: EventType.RUN_ERROR,
        message: error.message || 'An error occurred',
      });
    }
  }
}