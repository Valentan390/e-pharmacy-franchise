import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmptyBodyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object' || !Object.keys(value).length) {
      throw new BadRequestException('Request body must not be empty');
    }
    return value;
  }
}
