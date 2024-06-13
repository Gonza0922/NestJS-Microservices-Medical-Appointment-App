import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ unique: true })
  appointment_ID: number;
  @Prop()
  patient_ID: number;
  @Prop()
  doctorName: string;
  @Prop({ type: Date, default: Date.now })
  appointmentDate: Date;
  @Prop()
  reason: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
