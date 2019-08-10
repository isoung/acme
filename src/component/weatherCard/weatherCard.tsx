import classnames from 'classnames';
import * as React from 'react';

import { WeatherPoint } from '~api/models/weatherPoint';
import '~component/weatherCard/weatherCard.scss';

interface WeatherCardProps {
  weatherPoints: WeatherPoint[];
  date: string;
  primary: boolean;
  id: number;
  onClick: (key: number) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = (props: WeatherCardProps) => {
  const maxWeatherPoint = props.weatherPoints.reduce((oldTemp, currentTemp) =>
    currentTemp.getTempMax() > oldTemp.getTempMax() ? currentTemp : oldTemp);

  const shouldText = determineShouldText(props.weatherPoints);
  const shouldEmail = determineShouldEmail(props.weatherPoints);
  const shouldCall = determineShouldCall(props.weatherPoints);

  return (
    <div className={classnames('uk-card uk-card-default uk-card-body acme-weather-card', {
      'uk-card-primary': props.primary
    })} onClick={() => props.onClick(props.id)}>
      <p>{props.date}</p>
      <p>{maxWeatherPoint.getTempMax()}</p>
      { shouldText === true ? <div className='uk-badge acme-weather-card__badge acme-weather-card__badge-text'>TEXT</div> : null }
      { shouldEmail === true ? <div className='uk-badge acme-weather-card__badge acme-weather-card__badge-email'>EMAIL</div> : null }
      { shouldCall === true ? <div className='uk-badge acme-weather-card__badge acme-weather-card__badge-call'>CALL</div> : null }
    </div>
  );
};

function determineShouldText(weatherPoints: WeatherPoint[]): boolean {
  let determination = false;
  weatherPoints.forEach((value) => {
    if (value.getTempMax() > 75 && value.getWeather()[0].getMain() === 'Clear') {
      determination = true;
    }
  });

  return determination;
}

function determineShouldEmail(weatherPoints: WeatherPoint[]): boolean {
  let determination = false;
  weatherPoints.forEach((value) => {
    if (value.getTempMax() > 55 && value.getTempMax() < 75) {
      determination = true;
    }
  });

  return determination;
}

function determineShouldCall(weatherPoints: WeatherPoint[]): boolean {
  let determination = false;
  weatherPoints.forEach((value) => {
    if (value.getTempMax() < 55 || value.getWeather()[0].getMain() === 'Rain') {
      determination = true;
    }
  });

  return determination;
}
