import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TimeService } from 'src/services/time.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('time')
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить текущее смещение времени (в минутах)' })
  @ApiResponse({ status: 200, description: 'Смещение времени получено' })
  async getOffset(): Promise<{ offsetMinutes: number }> {
    const offset = await this.timeService.getOffset();
    return { offsetMinutes: offset };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Установить новое смещение времени (в минутах)' })
  @ApiResponse({ status: 200, description: 'Смещение времени обновлено' })
  async setOffset(@Body() body: { offsetMinutes: number; type: boolean }) {
    const updated = await this.timeService.setOffset(
      body.offsetMinutes,
      body.type,
    );
    return {
      message: 'Смещение времени обновлено',
      offsetMinutes: `${updated.type ? "+" : "-"}${updated.offsetMinutes}`,
    };
  }

  @Get('now')
  @ApiOperation({
    summary: 'Получить "виртуальное" текущее время с учётом смещения',
  })
  @ApiResponse({ status: 200, description: 'Виртуальное время' })
  async getVirtualNow(): Promise<{ real: Date; virtual: Date }> {
    const real = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const virtual = await this.timeService.getVirtualNow();
    return { real, virtual };
  }
}
