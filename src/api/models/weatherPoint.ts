import { Weather } from '~api/models/weather';

export class WeatherPoint {
  private time: number;
  private tempMin: number;
  private tempMax: number;
  private weather: Weather[];
  private clouds: number;

  public constructor(time: number, tempMin: number, tempMax: number, weather: Weather[], clouds: number) {
    this.time = time;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.weather = weather;
    this.clouds = clouds;
  }

  public getTime(): number {
    return this.time;
  }

  public getTempMin(): number {
    return this.tempMin;
  }

  public getTempMax(): number {
    return this.tempMax;
  }

  public getWeather(): Weather[] {
    return this.weather;
  }

  public getClouds(): number {
    return this.clouds;
  }
}
