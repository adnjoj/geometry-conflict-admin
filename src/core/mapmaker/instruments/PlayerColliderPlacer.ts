import type { Scene } from '../scene/scene';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';
import { PlayerColliderBuilder } from '../game-objects/builders/PlayerColliderBuilder';
import { PathPlacer } from './PathPlacer';

export class PlayerColliderPlacer extends PathPlacer {
  protected color = '#f9de59';

  constructor(scene: Scene) {
    super(scene);
    this.createPreviewPoint();
  }

  protected generateName() {
    return 'player collider';
  }

  protected instantiateGameObjectAt(name: string, x: number, y: number) {
    const playerColliderBuilder = new PlayerColliderBuilder();
    const buildDirector = new GameObjectBuildDirector(playerColliderBuilder);
    const collider = buildDirector.construct(name);

    collider.updateRenderData({ x, y });

    return collider;
  }

  protected shouldReset() {
    // Points count is equals to actual count + 1
    // because 1 point always shows where the next will be put
    return this.pointsCount > 4;
  }
}
