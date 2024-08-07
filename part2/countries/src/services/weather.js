import axios from "axios";

const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
// ?q=Venice,it&APPID=KEY
const API_KEY_WEATHER = import.meta.env.VITE_SOME_KEY;

// const BASE_URL_ICONS_WEATHER = "https://openweathermap.org/img/wn/";

// const iconsDescription = {
//   "clear sky": "01d",
//   "few clouds": "02d",
//   "scattered clouds": "03d",
//   "broken clouds": "04d",
//   "shower rain": "09d",
//   "rain": "10d",
//   "thunderstorm": "11d",
//   "snow": "13d",
//   "mist": "50d",
// };

function getWeather(capital, isoCountry) {
  // console.log(capital, isoCountry);
  const query = `?q=${capital},${isoCountry}`;
  const appid = `&APPID=${API_KEY_WEATHER}`;
  const request = axios.get(`${BASE_URL_WEATHER}${query}${appid}`);
  const response = request.then((res) => res.data);
  // console.log(response);
  return response;
}

// function getIcon(iconCode) {
//   // https://openweathermap.org/img/wn/10d@2x.png
//   const iconExt = "@2x.png";
//   const FULL_URL = `${BASE_URL_ICONS_WEATHER}${iconCode}${iconExt}`;
//   console.log(iconCode, FULL_URL);
//   const request = axios.get(FULL_URL);
//   console.log(request);
//   return request.then((res) => res.data);
// }

export default { getWeather };
