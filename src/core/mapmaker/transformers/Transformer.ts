export abstract class Transformer {
  abstract toPlain(object: any): any;
  abstract toClass(object: any): any;
}
