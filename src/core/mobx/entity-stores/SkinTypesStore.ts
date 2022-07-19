import { action, makeAutoObservable } from 'mobx';
import { SkinTypesApiClient } from '../../api-client/skins/SkinTypesApiClient';
import type { SkinType } from '../../../types/entities/SkinType';

export class SkinTypesStore {
  skinTypes: SkinType[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  parseSkinTypes() {
    this.finishedParsing = false;

    SkinTypesApiClient.getAll()
      .then((response) => response.json())
      .then(
        action('fetchSuccess', (skinTypes: SkinType[]) => {
          this.skinTypes = skinTypes;
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

export const skinTypesStore = new SkinTypesStore();
