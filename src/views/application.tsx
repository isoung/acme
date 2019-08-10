import * as React from 'react';
import { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLine, VictoryTheme } from 'victory';

import { APIServiceFactory } from '~api/apiServiceFactory';
import { WeatherPoint } from '~api/models/weatherPoint';
import { WeatherService } from '~api/weatherService';
import { WeatherCard } from '~component/weatherCard/weatherCard';
import '~views/application.scss';

export const ApplicationContext = React.createContext({
  zipcode: '55401',
  loading: false,
  weatherPoints: []
});

export const Application: React.FC = () => {
  const weatherService = APIServiceFactory.buildFromStore(WeatherService);
  const [loading, setLoading] = useState(true);
  const [zipcode] = useState('55401');
  const [weatherPoints, setWeatherPoints] = useState<WeatherPoint[]>([]);
  const [activeDate, setActiveDate] = useState(0);

  async function fetchWeatherData() {
    const data = await weatherService.getWeatherForecast(zipcode);
    setWeatherPoints(data.weatherPoints);
    setLoading(false);
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const sortedWeatherPoints: any = {};
  weatherPoints.forEach((value: any) => {
    const date = new Date(0);
    date.setUTCSeconds(value.getTime());
    const readableDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' - ' + generateReadableDay(date.getDay());
    if (sortedWeatherPoints[readableDate] !== undefined) {
      sortedWeatherPoints[readableDate].push(value);
    }
    else {
      sortedWeatherPoints[readableDate] = [];
      sortedWeatherPoints[readableDate].push(value);
    }
  });
  const weatherCards = Object.keys(sortedWeatherPoints).map((value, i: number) => {
    if (i > 4) {
      return null;
    }

    return <WeatherCard onClick={setActiveDate} date={value} primary={i === activeDate} weatherPoints={sortedWeatherPoints[value]} key={i} id={i}/>;
  });
  const activeDateIndex = Object.keys(sortedWeatherPoints)[activeDate];
  const chartData = generateChartData(sortedWeatherPoints[activeDateIndex]);

  return (
    <ApplicationContext.Provider value={{ zipcode: zipcode, loading: loading, weatherPoints: weatherPoints }}>
      <div className='uk-margin-large-right uk-margin-large-left uk-margin-large-top acme-application'>
        <div className='uk-heading-small'>Minneapolis - 55401</div>
        <div className='uk-flex uk-flex-between'>
          {weatherCards}
        </div>
        <div>
          <div className='uk-heading-small'>Weather at a glance</div>
          <VictoryChart
            height={200}
            width={500}
          >
            <VictoryGroup
              theme={VictoryTheme.material}
              domainPadding={{y: 2}}
            >
              <VictoryLine
                interpolation='natural'
                data={chartData}
              />
              <VictoryAxis dependentAxis style={{ axis: {} }}/>
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    </ApplicationContext.Provider>
  );
};

function generateReadableDay(day: number) {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}

function generateChartData(weatherPoints: WeatherPoint[]): Array<{ x: number, y: number }> {
  console.log(weatherPoints);
  if (weatherPoints === undefined) {
    return [];
  }

  return weatherPoints.map((value, i: number) => {
    return { x: i, y: value.getTempMax() };
  });
}
