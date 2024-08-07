import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './interface/note.interface';
import { CreateNote } from './dto/note.dto';

@Injectable()
export class NoteService {
    constructor(@InjectModel('note') private readonly noteModel :Model <Note>){}
    // createNote
    async createNote(createNote:CreateNote,userId):Promise<Note>{

        let {title,description,tag} =await createNote;

        let note =await this.noteModel.create({
            user:userId,
            title,
            description,
            tag
        })

        return note;
    }
    // getSingleNote

    async getSingleNote(id:string):Promise<Note>{
        return this.noteModel.findById(id)
    }
    // getAllNotes

    async getAllNotes(id:string):Promise<Note[]>{
        return this.noteModel.find({user:id})
    }
    // updateNote
    async updateNote(createNote:CreateNote,id:string):Promise<Note>{
        return this.noteModel.findByIdAndUpdate(id,createNote,{new:true})
    }
    // deleteNote
    async deleteNote(id:string):Promise<Note>{
        return this.noteModel.findByIdAndDelete(id)
    }
}

