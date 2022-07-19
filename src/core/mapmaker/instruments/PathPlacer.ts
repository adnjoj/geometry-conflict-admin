import type { Scene } from '../scene/scene';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';
import { PathBuilder } from '../game-objects/builders/PathBuilder';
import { PointBuilder } from '../game-objects/builders/PointBuilder';
import { Instrument } from './Instrument';

import { gameObjectsStore } from '../../mobx/mapmaker-stores/GameObjectsStore';

export class PathPlacer extends Instrument {
  protected color = 'blue';

  protected gameObjectId: string;
  protected lastPointId: string;
  protected pointsCount = 0;

  constructor(scene: Scene) {
    super(scene);
    this.createPreviewPoint();
  }

  destroy() {
    this.scene.gameObjects.delete('test_point');
    if (this.lastPointId) {
      gameObjectsStore.deleteGameObjects([this.lastPointId]);
    }
  }

  onMouseUp() {}

  onMouseDown(event: MouseEvent) {
    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    if (event.button !== 0) return;
    if (!this.gameObjectId && !gameObjectsStore.tree.nodes[this.gameObjectId]) {
      this.createGameObject(roundedX, roundedY);
    }

    this.addPoint(roundedX, roundedY);
  }

  onMouseMove() {
    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    const gameObject = gameObjectsStore.tree.nodes[this.gameObjectId];
    if (!gameObject) return this.setPreviewPointPosition(roundedX, roundedY);

    const point = gameObjectsStore.tree.nodes[this.lastPointId];
    point?.updateRenderData?.({ x: roundedX, y: roundedY });
  }

  protected createPreviewPoint() {
    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    const point = this.instantiatePointAt('test_point', roundedX, roundedY);
    point.updateRenderData({ color: this.color });
    this.scene.gameObjects.set('test_point', point);
  }

  protected get previewPoint() {
    return this.scene.gameObjects.get('test_point');
  }

  protected setPreviewPointPosition(x: number, y: number) {
    const previewPoint = this.previewPoint;
    previewPoint?.updateRenderData?.({ x, y });
  }

  protected generateName() {
    return 'path';
  }

  protected instantiateGameObjectAt(name: string, x: number, y: number) {
    const pathBuilder = new PathBuilder();
    const buildDirector = new GameObjectBuildDirector(pathBuilder);
    const path = buildDirector.construct(name);

    path.updateRenderData({ x, y });

    return path;
  }

  protected instantiatePointAt(name: string, x: number, y: number) {
    const pointBuilder = new PointBuilder();
    const buildDirector = new GameObjectBuildDirector(pointBuilder);
    const point = buildDirector.construct(name);

    point.updateRenderData({ x, y });

    return point;
  }

  protected createGameObject(x: number, y: number) {
    const name = this.generateName();
    const gameObject = this.instantiateGameObjectAt(name, x, y);

    gameObjectsStore.addGameObjects([gameObject]);
    gameObjectsStore.root.addChild(gameObject);

    this.gameObjectId = gameObject.id;

    this.addPoint(x, y);
  }

  protected addPoint(x: number, y: number) {
    const gameObject = gameObjectsStore.tree.nodes[this.gameObjectId];
    if (!gameObject) return this.reset();

    const name = `point ${this.pointsCount + 1}`;
    const point = this.instantiatePointAt(name, x, y);

    gameObjectsStore.addGameObjects([point]);
    gameObject.addChild(point);

    this.lastPointId = point.id;
    this.pointsCount += 1;
    if (this.shouldReset()) return this.reset();
  }

  protected shouldReset() {
    return false;
  }

  protected reset() {
    gameObjectsStore.deleteGameObjects([this.lastPointId]);
    this.gameObjectId = undefined;
    this.lastPointId = undefined;
    this.pointsCount = 0;
  }
}
