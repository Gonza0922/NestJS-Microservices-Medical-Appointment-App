import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
  findOneAppointmentEndpoint(@Param('appointment_ID') appointment_ID: string) {
    return this.appointmentsService.findOne(appointment_ID);
  }

  @Put('/put/:appointment_ID')
  updateAppointmentEndpoint(
    @Param('appointment_ID') appointment_ID: string,
    @Body() updateAppointment: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateAppointment(
      appointment_ID,
      updateAppointment,
    );
  }

  @Delete('/delete/:appointment_ID')
  removeAppointmentEndpoint(@Param('appointment_ID') appointment_ID: string) {
    return this.appointmentsService.removeAppointment(appointment_ID);
  }
}
