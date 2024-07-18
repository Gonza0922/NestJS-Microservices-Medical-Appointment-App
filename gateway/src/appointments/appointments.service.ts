import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject('APPOINTMENTS') private readonly appointmentsClient: ClientProxy,
  ) {}

  async createAppointment(createAppointment: CreateAppointmentDto) {
    try {
      return await firstValueFrom(
        this.appointmentsClient.send(
          { cmd: 'createAppointment' },
          createAppointment,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.appointmentsClient.send({ cmd: 'findAllAppointments' }, {}),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(appointment_ID: string) {
    try {
      return await firstValueFrom(
        this.appointmentsClient.send(
          { cmd: 'findOneAppointment' },
          appointment_ID,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateAppointment(
    appointment_ID: string,
    updateAppointment: UpdateAppointmentDto,
  ) {
    try {
      return await firstValueFrom(
        this.appointmentsClient.send(
          { cmd: 'updateAppointment' },
          { appointment_ID, ...updateAppointment },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async removeAppointment(appointment_ID: string) {
    try {
      return await firstValueFrom(
        this.appointmentsClient.send(
          { cmd: 'removeAppointment' },
          appointment_ID,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
