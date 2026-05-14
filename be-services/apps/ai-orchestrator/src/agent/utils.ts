import OpenAI from "openai";
import { ChatCompletionStreamParams } from "openai/lib/ChatCompletionStream.js";
import type { ChatCompletionMessageParam } from "openai/resources";

export const openaiMessages = (input:ChatCompletionMessageParam[]): ChatCompletionMessageParam[] => input.map((msg)=>{
    switch(msg.role){
        case 'system':
            return {
                role:'system',
                content: msg.content
            }
        case 'user':
            return {
                role:'user',
                content: msg.content
            }
        case 'assistant':
            return {
                role:'assistant',
                content: msg.content,
                tool_calls: msg.tool_calls,
            }
        case 'tool':
            return {
            role: 'tool',
            tool_call_id: msg.tool_call_id!,
            content: msg.content,
            };
        default:
            throw new Error(`Unsupported role: ${msg.role}`);
    }
})