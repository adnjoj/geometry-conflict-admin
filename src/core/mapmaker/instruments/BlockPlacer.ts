import type { Scene } from '../scene/scene';
import type { GameObject as GameObjectEntity } from '../../../types/entities/GameObject';
import { Instrument } from './Instrument';
import { SolidObjectBuilder } from '../game-objects/builders/SolidObjectBuilder';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';

import { gameObjectsStore } from '../../mobx/mapmaker-stores/GameObjectsStore';
import { getBuilderByGameObjectType } from '../game-objects/get-builder-by-game-object-type';

export class BlockPlacer extends Instrument {
  constructor(
    scene: Scene,
    public readonly block: GameObjectEntity & { url: string },
  ) {
    super(scene);

    const { x, y } = scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    const builder = new SolidObjectBuilder();
    const buildDirector = new GameObjectBuildDirector(builder);
    const previewBlock = buildDirector.construct('test_block');
    previewBlock.updateRenderData({
      x: roundedX,
      y: roundedY,
      id: block.id,
      file: block.url,
    });

    scene.gameObjects.set('test_block', previewBlock);
  }

  destroy() {
    this.scene.gameObjects.delete('test_block');
  }

  onMouseUp() {}

  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;

    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    this.placeBlock(roundedX, roundedY);
  }

  onMouseMove() {
    const { x, y } = this.scene.mouse.position;
    const roundedX = x - (x % 10);
    const roundedY = y - (y % 10);

    const testBlock = this.scene.gameObjects.get('test_block');
    testBlock.updateRenderData({ x: roundedX, y: roundedY });
  }

  protected placeBlock(x: number, y: number) {
    const blockBuilder = getBuilderByGameObjectType(this.block.type.id);
    const buildDirector = new GameObjectBuildDirector(blockBuilder);
    const block = buildDirector.construct(
      this.generateName(this.block.type.name),
    );

    const { id, url: file } = this.block;
    block.updateRenderData({ x, y, id, file });

    gameObjectsStore.addGameObjects([block]);
    gameObjectsStore.root.addChild(block);
  }

  generateName(blockType: string) {
    return blockType.toLowerCase() ?? 'game object';
  }
}
