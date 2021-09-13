import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// ExecutionContext : Permite a captura da requisição
export const MyDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.ip);
    return req.ip;
  },
);
