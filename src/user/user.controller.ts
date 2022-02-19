import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/user/user.entity';
import { GetUser } from './get.user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserEntity) {
    return user;
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
