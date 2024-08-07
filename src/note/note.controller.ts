import { Controller,Body, Req ,Post,Get,Param, Delete, Put} from '@nestjs/common';
import { CreateNote } from './dto/note.dto';
import { NoteService } from './note.service';
 import {Note} from "./interface/note.interface"
 import { CustomRequest } from './interface/user.interface';
@Controller('note')
export class NoteController {
    constructor(private readonly noteService:NoteService){}

    @Post()
    async createNote(@Body() createNote:CreateNote,@Req() req:CustomRequest):Promise<Note>{
        // console.log(req.user.id)
        return this.noteService.createNote(createNote,req.user.id)
    }

    @Get(':id')
    async getSingleNote(@Param('id') id):Promise<Note>{
        return this.noteService.getSingleNote(id)
    }

    @Get()
    async getAllNotes(@Req() req:CustomRequest):Promise<Note[]>{
        return this.noteService.getAllNotes(req.user.id)
    }

    @Delete(':id')
    async deleteNote(@Param('id') id ):Promise<Note | string>{
        return this.noteService.deleteNote(id)
    }

    @Put(':id')
    async updateNote(@Body() createNote:CreateNote,@Param('id') id):Promise<Note>{

        return this.noteService.updateNote(createNote,id)

    }
}
