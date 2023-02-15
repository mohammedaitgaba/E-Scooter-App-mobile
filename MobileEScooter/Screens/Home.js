import { StyleSheet,View, Text,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import MapView,{ Marker } from "react-native-maps";
import * as Location from 'expo-location';


export default function Home() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    let text = 'Waiting..';
    
    // useEffect(()=>{
    //     getCurrentLocation()
    // },[])
    
    const { width, height } = Dimensions.get("window");

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
    const initial_location = {
        latitude: 32.29496475761959,
        longitude: -9.234702467931514,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
    // const getCurrentLocation = async()=>{
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         // return;
    //     }
    
    //     let currentLocation = await Location.getCurrentPositionAsync({});
    //     if (errorMsg) {
    //         text = errorMsg;
    //     } else if (currentLocation) {
    //         console.log(currentLocation);
    //         // setLatitude(currentLocation.coords.latitude)
    //         // setLongitude(currentLocation.coords.longitude)
    //     }
    // }
  return (
    <View>
        <MapView style={styles.map} initialRegion={initial_location}>
        <Marker
            coordinate={{
            latitude: 32.29496475761959,
            longitude: -9.234702467931514,
            }}
            title={'Marker Title'}
            description={'Marker Description'}
        />
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });