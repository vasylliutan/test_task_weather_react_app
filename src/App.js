import React, { Component } from "react";
import "./css/App.css";
import { connect } from "react-redux";
import { addCity, removeCity, setWeatherData } from "./actions";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favourites from "./components/Favourites";
import API_KEY from "./config.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.callWeatherData = this.callWeatherData.bind(this);
  }

  callWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((data) => {
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          main: data.main,
          wind: data.wind,
          humidity: data.main.humidity,
          wind_direction: data.wind.deg,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          visibility: data.visibility,
          sunset: data.sys.sunset,
        };
        this.props.setWeatherData(weatherObj);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  render() {
    const { searchDone, weatherData, cityList, errorMessage } = this.props;

    return (
      <div className="App">
        <SearchBar
          callBackFromParent={this.callWeatherData}
          error={errorMessage}
        />
        {searchDone && (
          <WeatherCard weatherData={weatherData} savedCities={cityList} />
        )}
        {cityList.length > 0 && (
          <Favourites
            savedCities={cityList}
            callBackFromParent={this.callWeatherData}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchDone: state.searchDone,
  weatherData: state.weatherData,
  cityList: state.cityList,
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = {
  addCity,
  removeCity,
  setWeatherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
