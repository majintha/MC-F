import { BaseEntity } from "./base-entity";
import { ROOM_TYPE } from "./room-type";
import { Building } from "./building";


export class Room extends BaseEntity {
  room_name: string;
  room_type: ROOM_TYPE;
  capacity: string;
  building: Building;
  tags;
  unavailable;
}