import type {
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions';

import { RunAgentInput } from '@ag-ui/core';

export const openaiMessages = (
  input: RunAgentInput
): ChatCompletionMessageParam[] =>
  input.messages.map((msg) => {
    const normalizedRole =
      msg.role === 'developer'
        ? 'system'
        : msg.role;

    const content =
      typeof msg.content === 'string'
        ? msg.content
        : Array.isArray(msg.content)
          ? msg.content
              .filter((part) => part.type === 'text')
              .map((part) => ({
                type: 'text' as const,
                text: part.text,
              }))
          : '';

    // assistant
    if (msg.role === 'assistant') {
      return {
        role: 'assistant',
        content,
        ...(msg.toolCalls
          ? { tool_calls: msg.toolCalls }
          : {}),
      };
    }

    // tool
    if (msg.role === 'tool') {
      return {
        role: 'tool',
        tool_call_id: msg.toolCallId!,
        content:
          typeof msg.content === 'string'
            ? msg.content
            : JSON.stringify(msg.content),
      };
    }

    // user/system/developer
    return {
      role: normalizedRole as 'user' | 'system',
      content,
    };
  });