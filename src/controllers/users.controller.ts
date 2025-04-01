import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { LoginUserDto } from 'src/dto/login-user.dto';

@ApiTags('users')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан' })
  create(@Body() body: any): Promise<User> {
    console.log(body);
    return this.usersService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить пользователя по ID' })
  update(@Param('id') id: number, @Body() userData: CreateUserDto) {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя по email и паролю' })
  @ApiResponse({
    status: 200,
    description: 'Успешный логин или возврат корректного пароля',
  })
  async login(@Body() loginDto: LoginUserDto) {
    return this.usersService.login(loginDto.email, loginDto.password);
  }
}
