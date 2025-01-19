import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CheckCookiesPipe implements PipeTransform {
  constructor(private requiredCookies: string[]) {}

  transform(value: Request) {
    if (!value || !value.cookies) {
      throw new BadRequestException('Cookies are missing in the request');
    }

    for (const cookie of this.requiredCookies) {
      if (!value.cookies[cookie]) {
        throw new BadRequestException(`Cookie "${cookie}" is missing`);
      }
    }

    return value;
  }
}
