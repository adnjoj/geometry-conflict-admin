import type { Scene } from './scene';
import type { Instrument } from '../instruments/Instrument';
import { Pointer } from '../instruments/Pointer';

export class InstrumentController {
  private changeListeners = new Array<(instrument: Instrument) => void>();

  public instrument: Instrument;

  constructor(private readonly scene: Scene) {
    scene.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    scene.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    scene.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.setInstrument(Pointer, scene);
  }

  public addChangeListener(listener: (instrument: Instrument) => void) {
    this.changeListeners.push(listener);
  }

  public setInstrument<T extends Instrument>(
    NewInstrument: new (...params: any[]) => T,
    ...params: any[]
  ) {
    this.instrument?.destroy();
    this.instrument = new NewInstrument(this.scene, ...params);
    this.changeListeners.forEach((listener) => listener(this.instrument));
  }

  private onMouseUp(event: MouseEvent) {
    this.instrument?.onMouseUp(event);
  }

  private onMouseDown(event: MouseEvent) {
    this.instrument?.onMouseDown(event);
  }

  private onMouseMove(event: MouseEvent) {
    this.instrument?.onMouseMove(event);
  }
}
