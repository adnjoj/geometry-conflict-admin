interface Shortcut {
  keys: string[];
  callback: () => void;
}

export class ShortcutsController {
  private keysPressed = new Set<string>();
  public readonly shortcuts = new Array<Shortcut>();

  init() {
    window.addEventListener('keyup', (event) => {
      if (this.keysPressed.has(event.code)) {
        this.keysPressed.delete(event.code);
      }
    });

    window.addEventListener('keydown', (event) => {
      this.keysPressed.add(event.code);
      this.checkShortcuts();
    });
  }

  public addShortcut(keys: string[], callback: () => void) {
    this.shortcuts.push({ keys, callback });
  }

  private checkShortcuts() {
    const keysPressedArray = Array.from(this.keysPressed.values());

    this.shortcuts.forEach(({ keys, callback }) => {
      if (keys.sort().join(',') === keysPressedArray.sort().join(',')) {
        callback();
      }
    });
  }
}

export const shortcutsController = new ShortcutsController();
