import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  createAppointmentEndpoint(@Body() createAppointment: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointment);
  }

  @Get()
  findAllAppointmentsEndpoint() {
    return this.appointmentsService.findAll();
  }

  @Get('/get/:appointment_ID')
  findOneAppointmentEndpoint(
    @Param('appointment_ID', ParseIntPipe) appointment_ID: number,
  ) {
    return this.appointmentsService.findOne(appointment_ID);
  }

  @Put('/put/:appointment_ID')
  updateAppointmentEndpoint(
    @Param('appointment_ID', ParseIntPipe) appointment_ID: number,
    @Body() updateAppointment: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateAppointment(
      appointment_ID,
      updateAppointment,
    );
  }

  @Delete('/delete/:appointment_ID')
  removeAppointmentEndpoint(
    @Param('appointment_ID', ParseIntPipe) appointment_ID: number,
  ) {
    return this.appointmentsService.removeAppointment(appointment_ID);
  }
}
