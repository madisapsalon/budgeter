import { ValidationPipe } from '@nestjs/common';

export class AuthValidationPipe extends ValidationPipe {
  constructor() {
    super({
      validationError: {
        target: false,
        value: false,
      },
    });
  }
}
