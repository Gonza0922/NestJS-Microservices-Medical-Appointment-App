import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  patient_ID: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  doctorName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  reason: string;
}

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  patient_ID: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  doctorName: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  reason: string;
}
