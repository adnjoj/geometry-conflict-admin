import { action, makeAutoObservable } from 'mobx';
import { MapsApiClient } from '../../api-client/maps/MapsApiClient';
import type { Map } from '../../../types/entities/Map';

export class MapsStore {
  maps: Map[] = [];
  parsingError: Error = null;
  finishedParsing = false;

  constructor() {
    makeAutoObservable(this);
  }

  parseMaps() {
    this.finishedParsing = false;

    MapsApiClient.getAll()
      .then((response) => response.json())
      .then(
        action('fetchSuccess', (maps: Map[]) => {
          this.maps = maps;
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

  parseMap(mapId: number) {
    this.finishedParsing = false;

    MapsApiClient.getOne(mapId)
      .then((response) => response.json())
      .then(
        action('fetchSuccess', (map: Map) => {
          const currentState = this.maps.find(({ id }) => id === mapId);
          this.maps.splice(this.maps.indexOf(currentState), 1, map);
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

export const mapsStore = new MapsStore();
