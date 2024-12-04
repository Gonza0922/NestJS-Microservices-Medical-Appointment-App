import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern({ cmd: 'createAppointment' })
  create(
    @Payload()
    payloadContent: {
      createAppointment: CreateAppointmentDto;
      token: string;
    },
  ) {
    return this.appointmentsService.create(payloadContent);
  }

  @MessagePattern({ cmd: 'findAllAppointments' })
  findAll(
    @Payload() payloadContent: { pagination: PaginationDto; token: string },
  ) {
    return this.appointmentsService.findAll(payloadContent);
  }

  @MessagePattern({ cmd: 'findOneAppointment' })
  findOne(
    @Payload() payloadContent: { appointment_ID: string; token: string },
  ) {
    return this.appointmentsService.findOne(payloadContent);
  }

  @MessagePattern({ cmd: 'updateAppointment' })
  update(@Payload() updateAppointment: UpdateAppointmentDto) {
    return this.appointmentsService.update(
      updateAppointment.appointment_ID,
      updateAppointment,
    );
  }

  @MessagePattern({ cmd: 'removeAppointment' })
  remove(@Payload() appointment_ID: string) {
    return this.appointmentsService.remove(appointment_ID);
  }
}
