import type { GameObject } from '../game-objects/GameObject';
import type { Map } from '../../../types/entities/Map';
import { Transformer } from './Transformer';
import { GameObjectBuildDirector } from '../game-objects/GameObjectBuildDirector';
import { ApiClient } from '../../api-client/ApiClient';

import { gameObjectsStore } from '../../mobx/mapmaker-stores/GameObjectsStore';
import { gameObjectTypesStore } from '../../mobx/entity-stores/GameObjectTypesStore';
import { getBuilderByGameObjectType } from '../game-objects/get-builder-by-game-object-type';

export class GameObjectTransformer extends Transformer {
  toPlain(gameObject: GameObject): any {
    const plain: any = {};
    plain.name = gameObject.name;

    plain.type = { id: gameObject.type };
    plain.state = { isHovered: false, isSelected: false, hideChildren: false };
    plain.x = gameObject.renderData?.x ?? 0;
    plain.y = gameObject.renderData?.y ?? 0;

    if (gameObject.isBlock() && 'id' in gameObject.renderData) {
      plain.image = { id: gameObject.renderData.id };
    } else {
      plain.image = null;
    }

    plain.children = gameObject.childrenIds.map((id) => {
      const child = gameObjectsStore.tree.nodes[id];
      return this.toPlain(child);
    });

    return plain;
  }

  toClass(
    gameObjectData: Map['gameObjects'][number] & any,
    parent?: GameObject,
  ): {
    [id: string]: GameObject;
  } {
    const builder = getBuilderByGameObjectType(gameObjectData.type.id);
    const buildDirector = new GameObjectBuildDirector(builder);
    const gameObject = buildDirector.construct(gameObjectData.name);

    if (gameObject.type === gameObjectTypesStore.elementsEnum.Scene) {
      gameObject.id = 'id0';
    }

    let renderData: any = {
      x: gameObjectData.x,
      y: gameObjectData.y,
    };

    if (gameObject.isBlock()) {
      const { id } = gameObjectData.image;
      renderData.id = id;
      renderData.file = `${ApiClient.SERVER_HOST}/game-objects/${id}/gameObjectImage.png`;
    }

    gameObject.updateRenderData(renderData);

    let children: any = {};

    gameObjectData.children.reverse().forEach((child) => {
      children = { ...children, ...this.toClass(child, gameObject) };
    });

    if (parent) parent.addChild(gameObject);

    return { [gameObject.id]: gameObject, ...children };
  }
}
