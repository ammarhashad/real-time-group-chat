import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    switch (context.getType<GqlContextType>()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;

      default: // 'http' | 'ws' | 'rpc'
        return context.switchToHttp().getRequest();
    }
  }

  handleRequest(err, user) {
    if (err) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
