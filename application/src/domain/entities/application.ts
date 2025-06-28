import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop()
  state: string;

  @Prop()
  quantity: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
