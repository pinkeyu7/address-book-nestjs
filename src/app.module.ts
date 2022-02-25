import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Contact } from './contact/contact.entity';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT) || 33060,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Contact],
      synchronize: true,
    }),
    UserModule,
    ContactModule,
    RouterModule.register([
      {
        path: 'api/contacts',
        module: ContactModule,
      },
      {
        path: 'api/users',
        module: UserModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
