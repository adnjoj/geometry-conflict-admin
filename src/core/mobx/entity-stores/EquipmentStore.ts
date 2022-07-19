import { action, makeAutoObservable } from 'mobx';
import type { Equipment } from '../../../types/entities/Equipment';

export class EquipmentStore {
  equipment: Equipment[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  parseEquipment() {
    setTimeout(
      action(() => {
        this.equipment = [
          {
            id: 1,
            name: 'Grenade 1',
            damage: 30,
            splash: 1,
            distance: 5,
            weight: 0.1,
            type: { id: 1, name: '1' },
          },
          {
            id: 2,
            name: 'Grenade 2',
            damage: 40,
            splash: 2,
            distance: 5,
            weight: 0.1,
            type: { id: 1, name: '1' },
          },
          {
            id: 3,
            name: 'Grenade 3',
            damage: 50,
            splash: 3,
            distance: 5,
            weight: 0.1,
            type: { id: 1, name: '1' },
          },
        ];
        this.parsingError = null;
        this.finishedParsing = true;
      }),
      1,
    );
  }
}

export const equipmentStore = new EquipmentStore();
