import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// この部分は /packages/server/src/guards/auth/*.guard.ts の使用に依存しているので修正の際は要確認
// TODO: リクエストオブジェクトに型を付ける

// export const RequestOrganization = createParamDecorator<void>(
//   (_, context: ExecutionContext) => {
//     const organization =
//       GqlExecutionContext.create(context).getContext().req?.organization;
//     if (!organization) throw new UnauthorizedException();
//     return organization;
//   },
// );

/**
 * リクエストしたユーザーを取得するデコレータ。
 * {@link AuthGuard} を事前に通す必要あり。
 **/
export const RequestUser = createParamDecorator<void>(
  (_, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;
    if (!(request && request.user)) {
      throw new Error('User is not authorized.');
    }
    return request.user;
  },
);
