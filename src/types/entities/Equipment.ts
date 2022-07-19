import type { EquipmentType } from './EquipmentType';

export interface Equipment {
  id: number;
  name: string;
  damage: number;
  splash: number;
  distance: number;
  weight: number;

  type: EquipmentType;
}
