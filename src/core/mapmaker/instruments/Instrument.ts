export abstract class Instrument {
  constructor(protected readonly scene) {}

  abstract onMouseUp(event: MouseEvent): void;

  abstract onMouseDown(event: MouseEvent): void;

  abstract onMouseMove(event: MouseEvent): void;

  abstract destroy(): void;
}
