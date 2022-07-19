import { gameObjectsStore } from '../../../core/mobx/mapmaker-stores/GameObjectsStore';
import { scene } from '../../../core/mapmaker/scene/scene';

const renderGameObjects = (ids = ['id0']) => {
  [...ids].reverse().forEach((id) => {
    const gameObject = gameObjectsStore.tree.nodes[id];
    if (!gameObject) return;

    if (gameObject.state.isSelected || gameObject.state.isHovered) {
      gameObject.renderer?.renderSelection(scene);
    }

    gameObject.renderer?.render(scene);

    renderGameObjects(gameObject.childrenIds);
  });
};

export const startRenderLoop = (ctx: CanvasRenderingContext2D) =>
  setInterval(() => {
    ctx.canvas.width = window.innerWidth - 66 - 500;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = '#d6d6d6';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    renderGameObjects();

    if (scene.gameObjects.has('test_point')) {
      scene.gameObjects.get('test_point').renderer.render(scene);
    }

    if (scene.gameObjects.has('test_block')) {
      scene.gameObjects.get('test_block').renderer.render(scene);
    }
  }, 1000 / 60);
