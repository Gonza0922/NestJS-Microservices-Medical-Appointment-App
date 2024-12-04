import { Inject, Injectable, Request } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class AppointmentsService {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async createAppointment(
    createAppointment: CreateAppointmentDto,
    token: string,
  ) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'createAppointment' },
          { createAppointment, token },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(paginationDto: PaginationDto, token: string) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'findAllAppointments' },
          { pagination: paginationDto, token },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(appointment_ID: string, token: string) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'findOneAppointment' },
          { appointment_ID, token },
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
        this.client.send(
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
        this.client.send({ cmd: 'removeAppointment' }, appointment_ID),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
