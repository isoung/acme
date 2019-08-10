import axios from 'axios';
import { AxiosInstance } from 'axios';

import { APIService } from '~api/apiService';
import { WeatherService } from './weatherService';

type APIServiceType<T> = new (axiosInstance: AxiosInstance, baseAPIURL: string) => T;

export class APIServiceFactory {
  public static buildFromStore<T extends APIService>(
    serviceType: APIServiceType<T>, baseAPIURL: string = APIService.DEFAULT_BASE_URL
  ): T | null {
    const http = axios.create({});

    switch (serviceType.name) {
      case 'WeatherService':
        return new WeatherService(http) as any;
      default:
        return null;
    }
  }
}
