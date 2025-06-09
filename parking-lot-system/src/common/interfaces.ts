import { VehicleType } from "./enums";

export interface vehicle {
    id: string;
    licensePlate: string;
    type: VehicleType
}

export interface Ticket {
    id: string;
    vehicleId: string;
    slotId: string;
    entryTime: Date;
    exitTime?: Date;
    levelId: string;
}