import { shortcutsController } from '../../../core/mapmaker/scene/ShortcutsController';
import { versionsStore } from '../../../core/mobx/mapmaker-stores/VersionsStore';
import { gameObjectsStore } from '../../../core/mobx/mapmaker-stores/GameObjectsStore';

export const initShortcuts = () => {
  shortcutsController.addShortcut(['Delete'], () => {
    const idsOfTheSelectedObjects = new Array<string>();

    gameObjectsStore.tree.forEach('id0', (node) => {
      if (node.id === 'id0') return;

      const parent = gameObjectsStore.tree.nodes[node.parentId];
      if (node.state.isSelected && !parent.state.isSelected) {
        idsOfTheSelectedObjects.push(node.id);
      }
    });
    gameObjectsStore.deleteGameObjects(idsOfTheSelectedObjects);
  });

  shortcutsController.addShortcut(['ShiftLeft', 'KeyG'], () => {
    gameObjectsStore.groupSelectedGameObjects();
  });

  shortcutsController.addShortcut(['ControlLeft', 'KeyZ'], () => {
    versionsStore.undo();
  });

  shortcutsController.addShortcut(['ControlLeft', 'KeyY'], () => {
    versionsStore.redo();
  });
};
