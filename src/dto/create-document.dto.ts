import { IsNotEmpty, IsString, IsObject, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'passport' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example: {
      number: '123456',
      issueDate: '2023-01-01',
      issuedBy: 'Gov Authority',
    },
    description: 'JSON-структура документа',
  })
  @IsNotEmpty()
  @IsObject()
  document: Record<string, any>;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
