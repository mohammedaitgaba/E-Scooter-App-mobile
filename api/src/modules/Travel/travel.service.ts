import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/users.schema';
import { Model } from 'mongoose';
import { TravelDto } from 'src/shared/dto/Travel.dto';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { Travel } from './schema/Travel.schema';


@Injectable()
export class TravelService {
    constructor(
        @InjectModel(Travel.name)
        private userModel:Model<Travel>
    ){}
    async AddNewTravel(Travel:TravelDto):Promise<{message:string}>{
        const newTravel = await this.userModel.create(Travel)
        if (!newTravel) {
            throw new  HttpException('No Deleted Posts found',HttpStatus.BAD_REQUEST)     
        }
        return {message:'Succesfully Saved'}
    }
}
