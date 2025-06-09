import { Injectable } from '@nestjs/common';
import { SlotStatus, VehicleType } from 'src/common/enums';
import { Ticket, vehicle } from 'src/common/interfaces';
import { ParkingLevel } from 'src/entities/parking-level.entity';
import { ParkingSlot } from 'src/entities/parking-slot.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ParkingLotService {
    private levels: ParkingLevel[] = [];
    private tickets: Map<string, Ticket> = new Map()

    constructor() {
        this.initParkingLot()
    }

    private initParkingLot() {
        for (let i = 0; i < 2; i++) {
            const levelId = `L${i + 1}`;
            const slots: ParkingSlot[] = [];
            for (let j = 0; j < 6; j++) {
                let type: VehicleType = j < 2 ? VehicleType.MOTORCYCLE : j < 4 ? VehicleType.CAR : VehicleType.TRUCK;
                slots.push({ id: uuidv4(), type, status: SlotStatus.AVAILABLE, levelId });
            }
            this.levels.push({ id: levelId, slots })
        }
    }

    parkVehicle(vehicle: vehicle): Ticket {
        for (const levels of this.levels) {
            const slot = levels.slots.find(x => x.type === vehicle.type && x.status === SlotStatus.AVAILABLE)
            if (slot) {
                slot.status = SlotStatus.OCCUPIED;
                const ticket: Ticket = {
                    id: uuidv4(),
                    vehicleId: vehicle.id,
                    slotId: slot.id,
                    levelId: slot.levelId,
                    entryTime: new Date(),
                };
                this.tickets.set(ticket.id, ticket)
                return ticket;
            }
        }
        throw new Error('No Availble slot for this vehicle type')
    }
    unparkVehicle(ticketId: string): string {
        const ticket = this.tickets.get(ticketId);
        if (!ticket) throw new Error('Invalid ticket');

        const level = this.levels.find(l => l.id === ticket.levelId);
        if (!level) throw new Error('Invalid level');

        const slot = level.slots.find(s => s.id === ticket.slotId);
        if (!slot) throw new Error('Slot not found');

        slot.status = SlotStatus.AVAILABLE;
        ticket.exitTime = new Date();
        return `Vehicle unparked. Duration: ${(ticket.exitTime.getTime() - ticket.entryTime.getTime()) / 60000} minutes.`;
    }
    getAvailability(): any {
        return this.levels.map(level => ({
            levelId: level.id,
            availability: level.slots.filter(s => s.status === SlotStatus.AVAILABLE).length,
        }));
    }
}
