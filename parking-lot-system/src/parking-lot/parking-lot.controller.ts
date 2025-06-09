import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { VehicleDto } from 'src/dto/vehicle.dto';
import {v4 as uuidv4} from 'uuid'
import { TicketDto } from 'src/dto/ticket.dto';

@Controller('parking-lot')
export class ParkingLotController {

    constructor(private readonly service:ParkingLotService) {}

    @Post('park')
    parkVehicle(@Body() vehicleDto:VehicleDto){
        const vehicle = { id: uuidv4(), ...vehicleDto };
        return this.service.parkVehicle(vehicle)
    }

    @Post('unpark')
    unparkVehicle(@Body() dto: TicketDto) {
      return this.service.unparkVehicle(dto.ticketId);
    }
  
    @Get('availability')
    getAvailability() {
      return this.service.getAvailability();
    }
}
