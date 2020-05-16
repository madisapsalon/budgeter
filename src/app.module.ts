import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EntriesModule } from './modules/entries/entries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Entries } from './modules/entries/entries.entity';
import { EntryTypesModule } from './modules/entry-types/entry-types.module';
import { EntryTypes } from './modules/entry-types/entry-types.entity';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.DB_HOST || dbConfig.host,
      port: process.env.DB_PORT || dbConfig.port,
      username: process.env.DB_USERNAME || dbConfig.username,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: process.env.DB_NAME || dbConfig.database,
      entities: [User, Entries, EntryTypes],
      synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    }),
    UserModule, EntriesModule, EntryTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
