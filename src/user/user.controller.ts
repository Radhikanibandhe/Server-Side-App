import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getProfile() {
    
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() authCredentialsDto: AuthCredentialsDTO) {
    return this.userService.signup(authCredentialsDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signin(@Body() authCredentialsDto: AuthCredentialsDTO) {
    return this.userService.signin(authCredentialsDto);
  }
}
