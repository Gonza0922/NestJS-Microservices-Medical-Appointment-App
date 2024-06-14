import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  // "/appointments"
  async create(createAppointment: CreateAppointmentDto) {
    try {
      const appointmentCreated =
        await this.appointmentModel.create(createAppointment);
      return await appointmentCreated.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/appointments"
  async findAll() {
    try {
      const appointments = await this.appointmentModel.find();
      if (!appointments)
        throw new HttpException('appointments not found', HttpStatus.NOT_FOUND);
      return appointments;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/appointments/get/:appointments"
  async findOne(appointment_ID: string) {
    try {
      const appointment = await this.appointmentModel.findById(appointment_ID);
      if (!appointment)
        throw new HttpException('appointment not found', HttpStatus.NOT_FOUND);
      return appointment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/appointments/put/:appointments"
  async update(
    appointment_ID: string,
    updateAppointment: UpdateAppointmentDto,
  ) {
    try {
      const appointmentUpdated = await this.appointmentModel.findByIdAndUpdate(
        appointment_ID,
        updateAppointment,
        { new: true },
      );
      if (!appointmentUpdated)
        throw new HttpException('appointment not found', HttpStatus.NOT_FOUND);
      return appointmentUpdated;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // "/appointments/delete/:appointments"
  async remove(appointment_ID: string) {
    try {
      const appointmentDeleted =
        await this.appointmentModel.findByIdAndDelete(appointment_ID);
      if (!appointmentDeleted)
        throw new HttpException('appointment not found', HttpStatus.NOT_FOUND);
      return `Appointment ${appointment_ID} deleted`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
