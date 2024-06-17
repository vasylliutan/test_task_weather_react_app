import React, { Component } from "react";
import "../css/Favourites.css";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setWeatherData } from "../actions";
import API_KEY from "../config.js";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather(event) {
    const city = event.target.value;
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
        console.error("Error fetching weather data: ", error);
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  render() {
    const { savedCities } = this.props;

    let cityElements = savedCities.map((city) => {
      return (
        <Button
          className="Favourites-btn"
          size="tiny"
          value={city}
          key={`${city}-button`}
          onClick={this.getWeather}
          content={city}
        />
      );
    });

    return (
      <div className="Favourites">
        <h3 className="Favourites-title">My favourite cities</h3>
        <div className="Favourites-button-container">{cityElements}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedCities: state.cityList,
});

const mapDispatchToProps = {
  setWeatherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
