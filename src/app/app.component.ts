import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from './weatherservice.service';
import { error } from 'selenium-webdriver';
import { CityWeather, CityWeatherProp } from '../city-weather';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cityToSearch : string = "Kolkata";
  cityName : string =" ";
  wdata : any;
  selectedCityList : string[];
  weatherList : CityWeather[];
  displayCityWeather : CityWeather = new CityWeather();
  constructor(private weatherService : WeatherserviceService){};

  initializeCityList() : void{
    this.weatherService.initializeCityList();
  }

  ngOnInit(){
    this.selectedCityList = [];
    this.weatherList = [];
    this.weatherService.getResultForCity(this.cityToSearch);
  }

  getResultsForCity(event) : void{
    
    this.wdata = null;
     this.weatherService.getResultForCity(this.cityToSearch).subscribe(data => this.prepareData(data),
    error => this.prepareData(undefined));
    console.log("In component class");
    
  }

  prepareData(data : any ) : void{
      console.log(typeof data);
    if(data == undefined){
      this.cityName = undefined;
      console.log("data not recieved.")
    }else{
      console.log(data);
      this.cityName = data.city.name;
      this.wdata = data;
      

    }
  }

  checkForDuplicateEntry(cityName) : boolean{
    for(var i = 0; i< this.selectedCityList.length ; i++){
      if(cityName.toLowerCase() === this.selectedCityList[0].toLowerCase()){
        return true;
      }
    }
    return false;
  }
  pushDataToList() :void{
      if(this.checkForDuplicateEntry(this.wdata.city.name)){
        alert("Data already added!");
        return;
      }

      let cityWeather : CityWeather = new CityWeather();
      cityWeather.name = this.wdata.city.name;
      cityWeather.lat = this.wdata.city.coord.lat;
      cityWeather.long = this.wdata.city.coord.lon;
      //pushing data to city List
      this.selectedCityList.push(cityWeather.name);
      let propretyArray = this.wdata.list;
      cityWeather.properties = [];
      for(var i = 0 ; i<propretyArray.length;i++){
        let cityWeatherProp : CityWeatherProp = new CityWeatherProp();
        cityWeatherProp.cloudDesc = propretyArray[i].weather[0].description;
        cityWeatherProp.min = propretyArray[i].temp.min;
        cityWeatherProp.max = propretyArray[i].temp.max;
        cityWeatherProp.speed = propretyArray[i].speed;
        cityWeatherProp.pressure = propretyArray[i].pressure;
        cityWeatherProp.icon = propretyArray[i].weather[0].icon;
        cityWeatherProp.clouds = propretyArray[i].clouds;
        var date = new Date (propretyArray[i].dt);
        cityWeatherProp.date = date.toDateString();
        cityWeather.properties.push(cityWeatherProp);
        
      }
      this.weatherList.push(cityWeather);
      this.displayCityWeatherData(cityWeather.name);
  }

  displayCityWeatherData(cityName : string) : void {
    console.log(cityName);
    //displaylogic for cities.
    for(var i = 0 ; i<this.weatherList.length ; i++){
      let cityWeather : CityWeather = this.weatherList[i];
      console.log("Name to be displayed ->" + cityWeather.name );
      if(cityName.toLowerCase() === cityWeather.name.toLowerCase()){
        this.displayCityWeather = this.weatherList[i];
        break;
      }
    }
    console.log("City Weather Displayed.");
  }

  removeFromList(cityName : string) : void{
    console.log(cityName);
    let ind = 0;
    for(var i = 0 ; i < this.weatherList.length ; i++){
      let cityWeather : CityWeather = this.weatherList[i];
      console.log("Data to be deleted -> " + cityWeather.name);
      if(cityName.toLowerCase() === cityWeather.name.toLowerCase()){
        ind = i;
        break;
      }
    }
    this.weatherList.splice(ind,1);
    this.selectedCityList.splice(ind,1);
    if(this.weatherList.length > 0 ){
      this.displayCityWeatherData(this.weatherList[0].name);
    }else{
      this.displayCityWeather = new CityWeather();
    }
  }
}
