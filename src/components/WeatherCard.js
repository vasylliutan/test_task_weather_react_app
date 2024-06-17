import React, { Component } from "react";
import "../css/WeatherBoards.css";
import "../css/weather-icons.min.css";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { addCity, removeCity } from "../actions";

class WeatherBoards extends Component {
  constructor(props) {
    super(props);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  saveData() {
    const { city } = this.props.weatherData;
    this.props.addCity(city);
  }

  deleteData() {
    const { city } = this.props.weatherData;
    this.props.removeCity(city);
  }

  render() {
    const {
      city,
      weather,
      country,
      temp,
      main,
      wind,
      humidity,
      wind_direction,
      pressure,
      sunrise,
      visibility,
      sunset,
    } = this.props.weatherData;
    const celcius = Math.round(temp - 273.15);
    const saveBtn = (
      <Button
        positive
        size="mini"
        onClick={this.saveData}
        content="Save to favourites"
      />
    );
    const deleteBtn = (
      <Button
        negative
        size="mini"
        onClick={this.deleteData}
        content="Delete from favourites"
      />
    );
    const existingCities = this.props.savedCities;

    return (
      <div className="WeatherBoards">
        <div className="WeatherLeft-board">
          <h1 className="WeatherCard-degrees">{celcius}°</h1>
          <div className="WeatherCard-icon-container">
            <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
            <p>
              {weather[0].main} as of {new Date().toLocaleTimeString()}
            </p>
          </div>
          <h2 className="WeatherCard-city">
            {city}, {country}
          </h2>
          {existingCities.includes(city) ? deleteBtn : saveBtn}
        </div>

        <div className="WeatherRight-board">
          <div className="WeatherCard-detail">
            <div>
              <h4>High/Low</h4>
            </div>
            <div>
              <p>
                {Math.floor(main.temp_max - 273.15)}/
                {Math.floor(main.temp_min - 273.15)}
              </p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Wind</h4>
            </div>
            <div>
              <p>{Math.floor((wind.speed * 18) / 5)} km/hr</p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Humidity</h4>
            </div>
            <div>
              <p>{humidity} %</p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Wind Direction</h4>
            </div>
            <div>
              <p>
                {wind_direction}
                <sup>o</sup> deg
              </p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Pressure</h4>
            </div>
            <div>
              <p>{pressure} hPa</p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Sunrise</h4>
            </div>
            <div>
              <p>{new Date(sunrise * 1000).toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Visibility</h4>
            </div>
            <div>
              <p>{visibility / 1000} Km</p>
            </div>
          </div>

          <div className="WeatherCard-detail">
            <div>
              <h4>Sunset</h4>
            </div>
            <div>
              <p>{new Date(sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedCities: state.cityList,
});

const mapDispatchToProps = {
  addCity,
  removeCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBoards);
