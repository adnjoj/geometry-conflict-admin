import { action, makeAutoObservable } from 'mobx';
import { WeaponTypesApiClient } from '../../api-client/weapons/WeaponTypesApiClient';
import type { WeaponType } from '../../../types/entities/WeaponType';

export class WeaponTypesStore {
  weaponTypes: WeaponType[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  parseWeaponTypes() {
    this.finishedParsing = false;

    WeaponTypesApiClient.getAll()
      .then((response) => response.json())
      .then(
        action('fetchSuccess', (weaponTypes: WeaponType[]) => {
          this.weaponTypes = weaponTypes;
          this.finishedParsing = true;
          this.parsingError = null;
        }),
      )
      .catch(
        action('fetchError', (error: Error) => {
          this.parsingError = error;
        }),
      );
  }
}

export const weaponTypesStore = new WeaponTypesStore();
