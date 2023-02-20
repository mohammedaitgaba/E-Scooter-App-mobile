import { StyleSheet,View, Text,Dimensions, Button } from 'react-native'
import React,{useEffect,useState,useRef} from 'react'
import MapView,{ Marker ,Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import * as geolib from 'geolib';




export default function Home() {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [traficShower, setTraficShower]=useState(false)
  const [locationWatcher, setLocationWatcher]=useState(false)
  const mapRef = useRef(null);

    let text = 'Waiting..';
    
    // useEffect(()=>{
    //     getCurrentLocation()
    // },[])
    
    const { width, height } = Dimensions.get("window");

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, [location]);
  
    useEffect(() => {
      if (locationWatcher) {
        console.log(locationWatcher);
        setTimeout(() => {  
          if (location) {
            mapRef.current.animateToRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
      
            let locationWatchId = Location.watchPositionAsync({}, (newLocation) => {
              setLocation(newLocation);
            });
            return () => {
              if (locationWatchId._z.remove) {
                return locationWatchId._z.remove()
              }
              // if (locationWatchId) {
              //   locationWatchId.remove();
              // }
            };
          }
        }, 2000);
    }
    }, [location,locationWatcher]);
  
    const handleMapLongPress = async (event) => {
      const Usermarker = event.nativeEvent.coordinate;
      setMarker(Usermarker);
    };
    useEffect(()=>{
      const RoutSetter= async()=>{
        if (marker) {
          const newDistance = geolib.getDistance(
            { latitude: location.coords.latitude, longitude:location.coords.longitude },
            { latitude: marker.latitude, longitude: marker.longitude }
            // location.coords.latitude,
            // location.coords.longitude,
            // marker.latitude,
            // marker.longitude
          );
          console.log(newDistance);
          setDistance(newDistance);
      
          const newBearing = await Location.getHeadingAsync({
            from: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            to: marker,
          });
          setBearing(newBearing);
      
          const newRouteCoordinates = [
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            {
              latitude: marker.latitude,
              longitude: marker.longitude,
            },
          ];
          setRouteCoordinates(newRouteCoordinates);
        }
      }
      RoutSetter()
    },[marker])
    const mapStyles = [
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
    ];
  return (
    <>
    {
      location?
    <View>
      <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyles}
          showsUserLocation={true}
          showsTraffic={traficShower}
          onLongPress={handleMapLongPress}
        >
          {marker && <Marker coordinate={marker} />}
          {routeCoordinates.length > 0 && <Polyline coordinates={routeCoordinates} />}
        </MapView>
        {/* <Button title="Show trafic!" onPress={()=>setTraficShower(!traficShower)} />     */}
        <Button  title={locationWatcher?"Static location":"Live location"} onPress={()=>setLocationWatcher(!locationWatcher)} />    
    </View>
    :
    <View style={styles.container}><Text>Loading...</Text></View>
    }
    </>
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
      height: '90%',
    }
  });