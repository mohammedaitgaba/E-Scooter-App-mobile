import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TravelDto } from 'src/shared/dto/Travel.dto';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
    constructor(private TravelService : TravelService){}
    @Post('NewTravel')
    @UsePipes(new ValidationPipe())
    AddNewTravel(@Body() travel:TravelDto){
        return this.TravelService.AddNewTravel(travel)
    }
}
