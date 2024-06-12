import { PartialType } from '@nestjs/mapped-types';

export class CreateAppointmentDto {
  patient_ID: number;
  doctorName: string;
  appointmentDate: Date;
  reason: string;
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  appointment_ID: number;
}
