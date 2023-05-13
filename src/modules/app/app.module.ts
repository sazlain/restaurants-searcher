import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedsModule } from 'src/seeds/seed.module';
import { SearcherModule } from '../searcher/searcher.module';

require('dotenv').config()
const envHost = process.env.APP_ENVIROMENT == 'local' ? process.env.DB_HOST : 'mongodb';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb://' + process.env.DB_USERNAME +
    ':' + process.env.DB_PASSWORD +
    '@' + envHost +
    ':' + process.env.DB_PORT +
    '/' + process.env.DB_DATABASE +
    '?authSource=admin'),
    SeedsModule,
    SearcherModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }