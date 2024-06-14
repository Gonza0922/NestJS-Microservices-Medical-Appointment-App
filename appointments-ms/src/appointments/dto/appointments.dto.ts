import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24, { message: 'patient_ID must be equal to 24 characters' })
  patient_ID: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  doctorName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  reason: string;
}

export class UpdateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24, { message: 'patient_ID must be equal to 24 characters' })
  appointment_ID: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(24, 24, { message: 'patient_ID must be equal to 24 characters' })
  patient_ID: string;
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
