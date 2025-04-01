import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DocumentsService } from 'src/services/documnets.service';
import { CreateDocumentDto } from 'src/dto/create-document.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать документ' })
  @ApiResponse({ status: 201, description: 'Документ создан' })
  create(@Body() docData: CreateDocumentDto) {
    return this.documentsService.create(docData);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все документы' })
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить документ по ID' })
  findOne(@Param('id') id: number) {
    return this.documentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить документ по ID' })
  update(@Param('id') id: number, @Body() docData: CreateDocumentDto) {
    return this.documentsService.update(id, docData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить документ по ID' })
  remove(@Param('id') id: number) {
    return this.documentsService.remove(id);
  }
}
