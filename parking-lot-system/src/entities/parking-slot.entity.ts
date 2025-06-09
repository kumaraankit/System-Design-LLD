import { SlotStatus, VehicleType } from "src/common/enums";

export class ParkingSlot{
id:string;
type:VehicleType;
status:SlotStatus=SlotStatus.AVAILABLE;
levelId: string;
}
