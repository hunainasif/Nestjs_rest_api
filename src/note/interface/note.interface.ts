import { Document } from "mongoose";


export interface Note extends Document{
    id?:string;
    title:string;
    description:string,
    tag:string
}