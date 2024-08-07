import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';
import { NoteModule } from './note/note.module';
import * as dotenv from "dotenv"
import { fetchUserMiddleWare } from './note/middleware/fetchUser';
dotenv.config()
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL),UserModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fetchUserMiddleWare)
      .forRoutes("note"); 
      
  }
}
