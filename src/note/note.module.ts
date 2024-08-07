import { Module } from '@nestjs/common';
 
 
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from  "./note.controller"
import { NoteService } from './note.service';
 import * as dotenv from "dotenv"
import { NoteSchema } from './schema/note.schema';
dotenv.config()
@Module({
  imports: [MongooseModule.forFeature([{name:"note",schema:NoteSchema}])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
