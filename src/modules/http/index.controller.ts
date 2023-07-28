import { Controller, Get } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { HttpService } from './index.service'

@Controller('cats')
@ApiTags('cats')
@Controller('cats')
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  getHello(): string {
    return this.httpService.getHello()
  }
}
