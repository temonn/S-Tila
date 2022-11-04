import './App.css';
import {useEffect, useState} from 'react'
import './weather.js';
import axios from 'axios';

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
  const ICON_URL = 'http://openweathermap.org/img/wn/';
  const API_KEY = 'API_AVAIN';

  function Weather({lat,lng}){
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const address = API_URL +
        'lat=' + lat +
        '&lon=' + lng +
        '&units=metric' +
        '&appid=' + API_KEY;

        console.log(address);

        axios.get(address)
            .then((response) => {
                console.log(response.data);
                setTemp(response.data.main.temp);
                setSpeed(response.data.wind.speed);
                setDirection(response.data.wind.deg);
                setDescription(response.data.weather[0].description);
                setIcon(ICON_URL + response.data.weather[0].icon + '@2x.png');
                console.log(ICON_URL + response.data.weather[0].icon + '@2x.png');
            }).catch (error => {
                alert(error);
            });
        }, [])

    return (
        <>
            <h3>Weather on your location</h3>
            <p>{temp} C&#176;</p>
            <p>{speed} m/s {direction} degrees</p>
            <p>{description}</p>
            <img src={icon} alt=""/>
        </>
    )
}

  useEffect (() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positon => {
        setLat(positon.coords.latitude);
        setLng(positon.coords.longitude);
      }, (error) => {
        alert(error);
      })
    } else {
      alert('Sijainninsaanti ei ole käytössä!')
    }
  }, [])

  /*if (isLoading) {
    return <p>Loading...</p>
  } else { */
    return (
    <div className='content'>
    <h3>Your position</h3>
    <p>
      Position:&nbsp; 
      {lat.toFixed(3)},
      {lng.toFixed(3)}
    </p>
    <Weather lat={lat} lng={lng} />
    </div>
  );
}
//}


export default App;
