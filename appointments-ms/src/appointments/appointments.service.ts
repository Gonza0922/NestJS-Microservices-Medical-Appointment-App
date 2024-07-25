import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  // "/appointments"
  async create(createAppointment: CreateAppointmentDto) {
    try {
      await axios.get(
        `http://${process.env.HOST_PORT}/users/get/${createAppointment.patient_ID}`,
      );
      const appointmentCreated =
        await this.appointmentModel.create(createAppointment);
      return await appointmentCreated.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/appointments"
  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, page } = paginationDto;
      const offset = (page - 1) * limit;
      const appointments = await this.appointmentModel
        .find()
        .skip(offset)
        .limit(limit);
      const totalPageData = await this.appointmentModel.countDocuments();
      const totalPage = Math.ceil(totalPageData / limit);
      if (!appointments)
        throw new RpcException({
          message: 'Appointments not found',
          status: HttpStatus.NOT_FOUND,
        });
      const appointmentPromises = appointments.map(async (appointment) => {
        const { data } = await axios.get(
          `http://${process.env.HOST_PORT}/users/get/${appointment.patient_ID}`,
        );
        return {
          ...appointment.toObject(),
          patient_ID: data,
        };
      });
      const finalAppointments = await Promise.all(appointmentPromises);
      return {
        data: finalAppointments,
        pagination: { page, limit, totalPage },
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/appointments/get/:appointments"
  async findOne(appointment_ID: string) {
    try {
      const appointment = await this.appointmentModel.findById(appointment_ID);
      if (!appointment)
        throw new RpcException({
          message: 'Appointment not found',
          status: HttpStatus.NOT_FOUND,
        });
      const { data } = await axios.get(
        `http://${process.env.HOST_PORT}/users/get/${appointment.patient_ID}`,
      );
      return { ...appointment.toObject(), patient_ID: data };
    } catch (error) {
      throw new RpcException(error);
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
        throw new RpcException({
          message: 'Appointment not found',
          status: HttpStatus.NOT_FOUND,
        });
      return appointmentUpdated;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/appointments/delete/:appointments"
  async remove(appointment_ID: string) {
    try {
      const appointmentDeleted =
        await this.appointmentModel.findByIdAndDelete(appointment_ID);
      if (!appointmentDeleted)
        throw new RpcException({
          message: 'Appointment not found',
          status: HttpStatus.NOT_FOUND,
        });
      return `Appointment ${appointment_ID} deleted`;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
