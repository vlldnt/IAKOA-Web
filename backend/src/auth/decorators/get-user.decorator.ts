import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserResponseDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
