import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Header from '../../components/Header/Header'
import { ACCESS_TOKEN } from "@env"
import style from './Search.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])

    const fetchCities = (text) => {
        setCity(text)
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ACCESS_TOKEN}`)
            .then(item => item.json())
            .then(data => {
                setCities(data.features.slice(0, 10))
            })
    }

    const btnClick = async () => {
        await AsyncStorage.setItem("newCity", city);
        navigation.navigate("Home", { city: city })
    }

    const listClick = async (cityName) => {
        setCity(cityName)
        await AsyncStorage.setItem("newCity", cityName);
        navigation.navigate("Home", { city: cityName })
    }

    return (
        <View style={style.view}>
            <Header name="Search Screen" />
            <TextInput
                label="City Name to search..."
                theme={{ colors: { primary: "#00aaff" } }}
                value={city}
                onChangeText={(text) => fetchCities(text)}
            />
            <Button
                icon="content-save"
                mode="contained"
                theme={{ colors: { primary: "#00aaff" } }}
                style={style.btn}
                onPress={() => btnClick()}
            >
                <Text style={{ color: "white" }}>Save Changes</Text>
            </Button>

            <FlatList
                data={cities}
                renderItem={({ item }) => {
                    return (
                        <Card
                            key={item.id}
                            style={style.list}
                            onPress={() => listClick(item.place_name)}
                        >
                            <Text>{item && item.place_name}</Text>
                        </Card>
                    )
                }}
                keyExtractor={(item) => item.id}
            />

        </View>
    );

}

export default Search;