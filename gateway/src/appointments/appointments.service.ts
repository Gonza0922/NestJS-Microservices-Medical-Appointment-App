import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject('APPOINTMENTS') private readonly appointmentsClient: ClientProxy,
  ) {}

  createAppointment(createAppointment: CreateAppointmentDto) {
    return this.appointmentsClient.send(
      { cmd: 'createAppointment' },
      createAppointment,
    );
  }

  findAll() {
    return this.appointmentsClient.send({ cmd: 'findAllAppointments' }, {});
  }

  findOne(appointment_ID: number) {
    return this.appointmentsClient.send(
      { cmd: 'findOneAppointment' },
      appointment_ID,
    );
  }

  updateAppointment(
    appointment_ID: number,
    updateAppointment: UpdateAppointmentDto,
  ) {
    return this.appointmentsClient.send(
      { cmd: 'updateAppointment' },
      { appointment_ID, ...updateAppointment },
    );
  }

  removeAppointment(appointment_ID: number) {
    return this.appointmentsClient.send(
      { cmd: 'removeAppointment' },
      appointment_ID,
    );
  }
}
