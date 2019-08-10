export class City {
  private name: string;
  private country: string;
  private timezone: number;

  public constructor(name: string, country: string, timezone: number) {
    this.name = name;
    this.country = country;
    this.timezone = timezone;
  }

  public getName(): string {
    return this.name;
  }

  public getCountry(): string {
    return this.country;
  }

  public getTimezone(): number {
    return this.timezone;
  }
}
