import { Injectable } from '@nestjs/common';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';

@Injectable()
export class AppointmentsService {
  create(createAppointment: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(appointment_ID: number) {
    return `This action returns a #${appointment_ID} appointment`;
  }

  update(appointment_ID: number, updateAppointment: UpdateAppointmentDto) {
    return `This action updates a #${appointment_ID} appointment`;
  }

  remove(appointment_ID: number) {
    return `This action removes a #${appointment_ID} appointment`;
  }
}
