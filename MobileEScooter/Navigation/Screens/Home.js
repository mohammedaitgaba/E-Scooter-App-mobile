import { StyleSheet,View, Text,Dimensions, Button,Modal,TouchableOpacity,TextInput } from 'react-native'
import React,{useEffect,useState,useRef} from 'react'
import MapView,{ Marker ,Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'




export default function Home() {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [traficShower, setTraficShower]=useState(false)
  const [locationWatcher, setLocationWatcher]=useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [title,setTitle]=useState('')

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
      console.log(Usermarker);
      setModalVisible(true)
      setMarker(Usermarker);
    };
    const handleSaveTravel = ()=>{
      
    }
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
          {marker&&distance && <Marker coordinate={marker} title={"line distance : "+distance +"m"} />}
          {routeCoordinates.length > 0 && <Polyline coordinates={routeCoordinates} />}
        </MapView>
        {/* <Button title="Show trafic!" onPress={()=>setTraficShower(!traficShower)} />     */}
        <View style={styles.options} >
          <Button  title={locationWatcher?"Static location":"Live location"} onPress={()=>setLocationWatcher(!locationWatcher)} />    
          <Button  title={locationWatcher?"hide my scooter":"Show my scooter"} onPress={()=>setLocationWatcher(!locationWatcher)} />    
        </View>
        <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.header}>Would you like to save this travel</Text>
          <TextInput
            style={styles.input}
            placeholder="Travel Title"
            value={title}
            onChangeText={setTitle}
          />
          <View style={[styles.options,{ width:'90%'}]}>
            {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={()=>handleSaveTravel()}>
              <MaterialIcons name='save-alt' type="font-awesome" size={20} color='#f9fafb' />
              <Text style={styles.title}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    },
    options:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-around',
      paddingTop:10
    },
    modal:{ 
      flex: 1,
      justifyContent: 'space-around', 
      alignItems: 'center' 
    },
    header:{
      fontSize: 18,
      fontWeight: 'bold'
    },
    input: {
      width:'50%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 16,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
      backgroundColor:'#06beb6'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
      color:'#f9fafb',
    },
  });