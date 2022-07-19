import type { GameObjectBuilder } from './builders/GameObjectBuilder';

export class GameObjectBuildDirector {
  constructor(private readonly builder: GameObjectBuilder) {}

  construct(name: string) {
    this.builder.buildId();
    this.builder.buildState();
    this.builder.buildType();
    this.builder.buildBox();
    this.builder.buildRenderer();
    this.builder.buildRenderData();

    this.builder.buildName(name);

    return this.builder.getResult();
  }
}
