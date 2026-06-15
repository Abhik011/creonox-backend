import {
  IsString,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateInsightDto {
  @IsString()
  title: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  seoDescription?: string;

  @IsOptional()
  seoKeywords?: any;

  @IsOptional()
  @IsString()
  llmSummary?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}