import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  year: string;
}
