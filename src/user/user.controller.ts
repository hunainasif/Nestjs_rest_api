import { Controller, Get, Post ,Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/CreateUser.dto';
import { LoginUser } from './dto/loginUser.dto';

@Controller('user')
export class UserController {
   constructor(private readonly userService:UserService){}

   @Post('register')
   async createUser(@Body() createUser:CreateUser):Promise<{token:string}>{
    return this.userService.createUser(createUser);
   }

   @Post('login')
   async loginUser(@Body() loginUserDto:LoginUser):Promise<{token:string} | string>{
    return this.userService.loginUser(loginUserDto)
   }

}
