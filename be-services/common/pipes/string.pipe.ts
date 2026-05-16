// src/config/custom/parse-uuid.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    //const re = /(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi;
    const re = /(.*<script)/gi;
    const input = (typeof value !== 'string')?JSON.stringify(value):value
    const hasThreat = input.match(re)
    if (hasThreat) {
      throw new BadRequestException('Bad Request');
    }
    return value;
  }

  // private isUUID(value: string): boolean {
  //   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  //   return uuidRegex.test(value);
  // }
}
