import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { EntriesModule } from './modules/entries/entries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Entries } from './modules/entries/entries.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'budgeter_DB',
      entities: [User, Entries],
      synchronize: false,
    }),
    UserModule, EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
