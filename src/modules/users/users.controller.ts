import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.i18n.t('common.HELLO', { lang: I18nContext.current().lang })
  }

  @Get('hello2')
  getHello2(): string {
    return this.i18n.t('common.NEW', {
      args: { name: 'Kimmy' },
      lang: I18nContext.current().lang,
    })
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto)
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username)
  }
}
