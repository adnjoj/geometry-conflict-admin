import type { Gamemode } from './Gamemode';
import type { GameObjectType } from './GameObjectType';

interface MapGameObject {
  id: number;
  name: string;
  x: number;
  y: number;
  angle: number;
  type: GameObjectType;
  image: { id: number };
  children: MapGameObject[];
}

export interface Map {
  id: number;
  name: string;
  width: number;
  height: number;
  gamemode: Gamemode;

  gameObjects: MapGameObject[];
}
