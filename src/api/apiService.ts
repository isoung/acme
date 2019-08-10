import { AxiosInstance } from 'axios';

export class APIService {
  public static readonly DEFAULT_BASE_URL: string =
    'http://api.openweathermap.org/data/2.5/forecast?&units=imperial&APPID=09110e603c1d5c272f94f64305c09436';

  protected HTTP: AxiosInstance;
  protected baseAPIURL: string;

  public constructor(
    axiosInstance: AxiosInstance,
    baseAPIURL: string = APIService.DEFAULT_BASE_URL
  ) {
    this.HTTP = axiosInstance;
    this.baseAPIURL = baseAPIURL;
  }
}
