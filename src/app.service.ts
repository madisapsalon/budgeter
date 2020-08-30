import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getResponse(): string {
    return 'Budgeter API is on!';
  }
}
