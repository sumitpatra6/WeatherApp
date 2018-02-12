import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const cityListUrl :string = "./assets/cityList.txt"; 
const weatherApiUrl :string = "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&mode=json&APPID=72322a4ac2e3b489cec7f10918c0ba59";
//const weatherApiUrl :string = "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&mode=json&APPID=72322a4ac2e3b489cec7f10918c0ba59"
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
