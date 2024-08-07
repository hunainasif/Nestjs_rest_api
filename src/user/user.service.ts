// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUser } from '../user/dto/CreateUser.dto'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUser } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUser): Promise<{ token: string }> {
    const { name, email, password } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      name,
      email,
      password: hash,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const JWT_SEC = `honeyisagoodboy`;
    const token = jwt.sign(data, JWT_SEC);

    return { token };
  }

//   loginUser
async loginUser(loginUser:LoginUser):Promise <{token:string} | string>{
    let {email,password}=loginUser;

    let user=await this.userModel.findOne({email})
     if(!user){
        throw new Error("Please authenticate using valid email")
     }
     
     let passwordCheck=await bcrypt.compare(password,user.password)

     if(!passwordCheck){
        throw new Error (`Please authenticate using correct credentials`)
     }
     
    const data = {
        user: {
          id: user.id,
        },
      };
      const JWT_SEC = `honeyisagoodboy`;
      const token = jwt.sign(data, JWT_SEC);
      return {token};
}
}
