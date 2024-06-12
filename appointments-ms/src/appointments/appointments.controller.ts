import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern({ cmd: 'createAppointment' })
  create(@Payload() createAppointment: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointment);
  }

  @MessagePattern({ cmd: 'findAllAppointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneAppointment' })
  findOne(@Payload() appointment_ID: number) {
    return this.appointmentsService.findOne(appointment_ID);
  }

  @MessagePattern({ cmd: 'updateAppointment' })
  update(@Payload() updateAppointment: UpdateAppointmentDto) {
    return this.appointmentsService.update(
      updateAppointment.appointment_ID,
      updateAppointment,
    );
  }

  @MessagePattern({ cmd: 'removeAppointment' })
  remove(@Payload() appointment_ID: number) {
    return this.appointmentsService.remove(appointment_ID);
  }
}
