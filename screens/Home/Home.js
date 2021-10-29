import React, { useState, useEffect } from 'react';
import { Card, Title } from 'react-native-paper';
import { View, Image } from 'react-native'
import Header from '../../components/Header/Header'
import { WEATHER_API_KEY } from "@env"
import style from './Home.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
    const { city } = props.route.params;

    const [info, setInfo] = useState({
        name: "loading !!",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon: "loading",
        pressure: "loading",
        wind: "loading"
    })

    useEffect(() => {
        getWeather()
    }, [])

    const getWeather = async () => {
        let newCity = await AsyncStorage.getItem("newCity")
        if (!newCity) {
            const { city } = props.route.params;
            newCity = city;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&APPID=${WEATHER_API_KEY}&units=metric`)
            .then(data => data.json())
            .then(results => {
                console.log(results);
                setInfo({
                    name: results.name,
                    temp: results.main.temp,
                    humidity: results.main.humidity,
                    desc: results.weather[0].description,
                    icon: results.weather[0].icon,
                    pressure: results.main.pressure,
                    wind: results.wind.speed
                })
            })
            .catch(err => {
                alert(err.message)
            })
    }

    if (city != "london") {
        getWeather()
    }

    return (
        <View style={style.view}>
            <Header name="Weather App" />
            <View style={style.placeView}>
                <Title style={style.title}>
                    {info.name}
                </Title>
                <Image
                    style={style.image}
                    source={{ uri: "https://openweathermap.org/img/w/" + info.icon + ".png" }}
                />
                <Title style={style.desc}>
                    {info.desc}
                </Title>
            </View>

            <Card elevation={3} style={style.card}>
                <Title style={style.infoTitle}>Temperature : {info.temp}</Title>
            </Card>
            <Card elevation={3} style={style.card}>
                <Title style={style.infoTitle}>Humidity : {info.humidity}</Title>
            </Card>
            <Card elevation={3} style={style.card}>
                <Title style={style.infoTitle}>Description :  {info.desc}</Title>
            </Card>
            <Card elevation={3} style={style.card}>
                <Title style={style.infoTitle}>Pressure :  {info.pressure}</Title>
            </Card>
            <Card elevation={4} style={style.card}>
                <Title style={style.infoTitle}>Wind Speed :  {info.wind}</Title>
            </Card>
        </View>
    )
}


export default Home