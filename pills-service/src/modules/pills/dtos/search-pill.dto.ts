import { IsOptional, IsString } from 'class-validator';

export class SearchPillDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;
}
