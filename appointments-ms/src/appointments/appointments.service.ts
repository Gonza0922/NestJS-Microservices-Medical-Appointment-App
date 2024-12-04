import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { PaginationDto } from 'src/common/pagination.dto';
import { envs } from 'src/config/envs';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  // "/appointments"
  async create(payloadContent: {
    createAppointment: CreateAppointmentDto;
    token: string;
  }) {
    try {
      await axios.get(
        `http://${envs.hostPort}/users/get/${payloadContent.createAppointment.patient_ID}`,
        {
          headers: {
            Authorization: `Bearer ${payloadContent.token}`,
          },
        },
      );
      const appointmentCreated = await this.appointmentModel.create(
        payloadContent.createAppointment,
      );
      return await appointmentCreated.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // "/appointments"
  async findAll(payloadContent: { pagination: PaginationDto; token: string }) {
    try {
      const { limit, page } = payloadContent.pagination;
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
          `http://${envs.hostPort}/users/get/${appointment.patient_ID}`,
          {
            headers: {
              Authorization: `Bearer ${payloadContent.token}`,
            },
          },
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
  async findOne(payloadContent: { appointment_ID: string; token: string }) {
    try {
      if (!Types.ObjectId.isValid(payloadContent.appointment_ID))
        throw new RpcException({
          message: 'Invalid appointment ID format',
          status: HttpStatus.BAD_REQUEST,
        });
      const appointment = await this.appointmentModel.findById(
        payloadContent.appointment_ID,
      );
      if (!appointment)
        throw new RpcException({
          message: 'Appointment not found',
          status: HttpStatus.NOT_FOUND,
        });
      const { data } = await axios.get(
        `http://${envs.hostPort}/users/get/${appointment.patient_ID}`,
        {
          headers: {
            Authorization: `Bearer ${payloadContent.token}`,
          },
        },
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
      if (!Types.ObjectId.isValid(appointment_ID))
        throw new RpcException({
          message: 'Invalid appointment ID format',
          status: HttpStatus.BAD_REQUEST,
        });
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
      if (!Types.ObjectId.isValid(appointment_ID))
        throw new RpcException({
          message: 'Invalid appointment ID format',
          status: HttpStatus.BAD_REQUEST,
        });
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
