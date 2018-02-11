import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const cityListUrl :string = "./assets/cityList.txt"; 
const weatherApiUrl :string = "https://api.openweathermap.org/data/2.5/forecast/daily?q={cityName}&units=metric&cnt=10&APPID=a9ffa2888e7a7c73ab858086eeffa51f"
@Injectable()
export class WeatherserviceService {

  constructor(private httpClient : HttpClient) { }

  initializeCityList() : void {
    this.httpClient.get(cityListUrl).subscribe(data => console.log(data));
  }

  getResultForCity(cityName : string) : Observable<any>{
    let url:string = weatherApiUrl.replace("{cityName}",cityName);
    return this.httpClient.get(url);
  }

}
