import { APIService } from '~api/apiService';
import { City } from '~api/models/city';
import { Weather } from '~api/models/weather';
import { WeatherPoint } from '~api/models/weatherPoint';

interface WeatherForecast {
  city: City;
  weatherPoints: WeatherPoint[];
}

export class WeatherService extends APIService {
  public async getWeatherForecast(zipcode: string): Promise<WeatherForecast> {
    try {
      const url = APIService.DEFAULT_BASE_URL + '&zip=' + zipcode;
      const response = await this.HTTP.get(url, {});

      const data = response.data;
      const weatherPoints: WeatherPoint[] = data.list.map((value: any) => {
        const weather: Weather[] = value.weather.map((weatherValue: any) => {
          return new Weather(weatherValue.id, weatherValue.main, weatherValue.description, weatherValue.icon);
        });

        return new WeatherPoint(
          value.dt,
          value.main.temp_min,
          value.main.temp_max,
          weather,
          value.clouds.all
        );
      });

      return {
        city: new City(data.city.name, data.city.country, data.city.timezone),
        weatherPoints: weatherPoints
      };
    }
    catch (err) {
      throw err;
    }
  }
}
