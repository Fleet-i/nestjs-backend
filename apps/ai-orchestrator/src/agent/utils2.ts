import type {
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions';
import { EventType, RunAgentInput } from '@ag-ui/core';
const openaiMessages = (input: RunAgentInput) => input.messages.map((msg)=>{
    // developer -> system
    const role =
      msg.role === 'developer'
        ? 'system'
        : msg.role;

    // assistant message
    if (role === 'assistant') {
      return {
        role: 'assistant',
        content: msg.content || '',
        ...(msg.toolCalls
          ? { tool_calls: msg.toolCalls }
          : {}),
      };
    }

    // tool message
    if (role === 'tool') {
      return {
        role: 'tool',
        tool_call_id: msg.toolCallId!,
        content: msg.content || '',
      };
    }

    // user/system message
    return {
      role: role as 'user' | 'system',
      content: msg.content || '',
    };
})
// const openaiMessages: ChatCompletionMessageParam[] =
//   input.messages.map((msg) => {
//     // developer -> system
//     const role =
//       msg.role === 'developer'
//         ? 'system'
//         : msg.role;

//     // assistant message
//     if (role === 'assistant') {
//       return {
//         role: 'assistant',
//         content: msg.content || '',
//         ...(msg.toolCalls
//           ? { tool_calls: msg.toolCalls }
//           : {}),
//       };
//     }

//     // tool message
//     if (role === 'tool') {
//       return {
//         role: 'tool',
//         tool_call_id: msg.toolCallId!,
//         content: msg.content || '',
//       };
//     }

//     // user/system message
//     return {
//       role: role as 'user' | 'system',
//       content: msg.content || '',
//     };
//   });