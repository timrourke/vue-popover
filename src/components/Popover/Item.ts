import ItemInterface from './ItemInterface';

export default class Item implements ItemInterface {
  private readonly label: string;
  private readonly active: boolean;

  constructor(label: string, active: boolean) {
    this.label = label;
    this.active = active;
  }

  public getLabel(): string {
    return this.label;
  }

  public isActive(): boolean {
    return this.active;
  }
}

