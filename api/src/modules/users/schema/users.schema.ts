import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps:true,
})
export class User {
    @Prop()
    UserName:String
    @Prop({unique: [true,'Duplicated email']})
    Email:String
    @Prop()
    Password:String
    @Prop({default:false})
    Deleted:boolean
}
export const UserSchema = SchemaFactory.createForClass(User)