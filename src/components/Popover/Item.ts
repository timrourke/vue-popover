export default class Item {
  private readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  public getLabel(): string {
    return this.label;
  }
}

