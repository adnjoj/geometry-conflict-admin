import { action, makeAutoObservable } from 'mobx';
import type { EquipmentType } from '../../../types/entities/EquipmentType';

export class EquipmentTypesStore {
  equipmentTypes: EquipmentType[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  parseEquipmentTypes() {
    setTimeout(
      action(() => {
        this.equipmentTypes = [
          { id: 1, name: 'Граната' },
          { id: 2, name: 'Аптечка' },
          { id: 3, name: 'Мина' },
        ];
        this.parsingError = null;
        this.finishedParsing = true;
      }),
      1,
    );
  }
}

export const equipmentTypesStore = new EquipmentTypesStore();
