export class CityWeatherProp{
    date : string;
    max : number;
    min : number;
    cloudDesc : string;
    speed : number;
    clouds : number;
    pressure : number;
    icon : string;

}
export class CityWeather{
    name :string;
    lat : string;
    long : string;
    properties : CityWeatherProp[];
   
        
}

