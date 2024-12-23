import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { Request } from 'express';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  createAppointmentEndpoint(
    @Body() createAppointment: CreateAppointmentDto,
    @Req() req: Request,
  ) {
    return this.appointmentsService.createAppointment(
      createAppointment,
      req['token'],
    );
  }

  @Get()
  findAllAppointmentsEndpoint(
    @Query() paginationDto: PaginationDto,
    @Req() req: Request,
  ) {
    return this.appointmentsService.findAll(paginationDto, req['token']);
  }

  @Get('/get/:appointment_ID')
  findOneAppointmentEndpoint(
    @Param('appointment_ID') appointment_ID: string,
    @Req() req: Request,
  ) {
    return this.appointmentsService.findOne(appointment_ID, req['token']);
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
