import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern('createAppointment')
  create(@Payload() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @MessagePattern('findAllAppointments')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @MessagePattern('findOneAppointment')
  findOne(@Payload() id: number) {
    return this.appointmentsService.findOne(id);
  }

  @MessagePattern('updateAppointment')
  update(@Payload() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(
      updateAppointmentDto.id,
      updateAppointmentDto,
    );
  }

  @MessagePattern('removeAppointment')
  remove(@Payload() id: number) {
    return this.appointmentsService.remove(id);
  }
}
