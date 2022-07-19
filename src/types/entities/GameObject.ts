import type { GameObjectType } from './GameObjectType';

export interface GameObject {
  id: number;
  name: string;
  type: GameObjectType;
}
