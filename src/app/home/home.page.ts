import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp: any;
  todayDate = new Date();
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;
  weatherDescription: any;
  searchCity: string = ''; // Inisialisasi dengan string kosong
  sunrise: any;
  sunset: any;
  humidity: any;
  pressure: any;
  highest: any;
  lowest: any;

  constructor(public httpClient: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.httpClient.get(`${API_URL}/weather?q=${'Manado'}&appid=${API_KEY}`).subscribe((data: any) => {
      console.log(data);
      this.weatherTemp = data.main;
      this.cityName = data.name;
      console.log(this.weatherTemp);
      this.weatherDetails = data.weather[0];
      console.log(this.weatherDetails);
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}.png`;
      this.weatherDescription = data.weather[0].description;
      this.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      this.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      this.humidity = data.main.humidity;
      this.pressure = data.main.pressure; // Gantilah 'uv' dengan nama yang benar dari data API
      this.highest = (data.main.temp_max - 273.15).toFixed(0);
      this.lowest = (data.main.temp_min - 273.15).toFixed(0);
    });
  }

  searchLocation() {
    if (this.searchCity.trim() !== '') {
      // Pastikan tidak ada input kosong
      this.httpClient.get(`${API_URL}/weather?q=${this.searchCity}&appid=${API_KEY}`).subscribe((data: any) => {
        // Proses data cuaca di sini
        console.log(data); // Cetak data untuk di-debug

        // Perbarui tampilan dengan hasil pencarian
        this.weatherTemp = data.main;
        this.cityName = data.name;
        this.weatherDetails = data.weather[0];
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}.png`;
        this.weatherDescription = data.weather[0].description;
        this.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        this.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        this.humidity = data.main.humidity;
      });
    }
  }

  convertToUppercase() {
    this.searchCity = this.searchCity.toUpperCase();
    this.weatherDescription = this.weatherDescription.toUpperCase();
  }
}
