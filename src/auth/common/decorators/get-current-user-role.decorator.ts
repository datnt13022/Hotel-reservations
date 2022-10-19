import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@src/auth/types';

export const GetCurrentUserRole = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.role;
  },
);
