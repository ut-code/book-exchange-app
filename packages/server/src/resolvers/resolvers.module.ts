import { Module } from '@nestjs/common';
import { MutationsModule } from './mutations/mutations.module';
import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [MutationsModule, QueriesModule],
})
export class ResolversModule {}
