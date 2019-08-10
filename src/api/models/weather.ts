export class Weather {
  private id: number;
  private main: string;
  private description: string;
  private icon: string;

  public constructor(id: number, main: string, description: string, icon: string) {
    this.id = id;
    this.main = main;
    this.description = description;
    this.icon = icon;
  }

  public getId(): number {
    return this.id;
  }

  public getMain(): string {
    return this.main;
  }

  public getDescription(): string {
    return this.description;
  }

  public getIcon(): string {
    return this.icon;
  }
}
