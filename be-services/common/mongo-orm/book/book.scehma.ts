import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Booking {
   @Prop()
   email: string;
   @Prop()
   name: string;
   @Prop()
   fromPinCode: number;
   @Prop()
   toPinCode: number;
   @Prop()
   fromAddress: string;
   @Prop()
   toAddress:string;
   @Prop()
   status: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);