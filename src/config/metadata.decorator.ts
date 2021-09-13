import { SetMetadata } from '@nestjs/common';

export const MyDecoratorMeta = () => SetMetadata('secured', true);
