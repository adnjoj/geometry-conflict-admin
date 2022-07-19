import { GameObject } from '../GameObject';

const idGenerator = (function* createIdGenerator() {
  for (let i = 0; i < Infinity; i += 1) yield `id${i}`;
})();

export abstract class GameObjectBuilder {
  protected readonly gameObject = new GameObject();

  buildId() {
    this.gameObject.id = idGenerator.next().value as string;
  }

  buildName(name: string) {
    this.gameObject.name = name;
  }

  buildState() {
    this.gameObject.state = {
      isSelected: false,
      isHovered: false,
      hideChildren: false,
    };
  }

  getResult() {
    return this.gameObject;
  }

  abstract buildType(): void;

  abstract buildBox(): void;

  abstract buildRenderer(): void;

  abstract buildRenderData(): void;
}
