import React, { useEffect, useState, useRef } from 'react'
import { Button, Image, TextInput } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import {enableLatestRenderer, Marker} from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const MapScreen = () => {

  enableLatestRenderer();
  // const mapView = React.createRef();
  const mapRef = useRef(null);
  const [order, setOrder] = useState();
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  console.log(position);

  const current_location = () => {
        Geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        }).catch((err) => {
      },{
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge : 2000
      })
      mapRef.current.animateToRegion(position, 3*1000);
  }

  const GetLongitudeFromAddress = (address) =>{
    var logLatApi = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false&key=AIzaSyCQckZTP5hiP_wozcqIM6IU_9BgOozNJeo';
    var header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    fetch(
        logLatApi,{
            method : 'GET',
            headers : header
        }
    ).then((response) => response.json())
    .then((responseJson)=>{
        if(responseJson.status ==='OK')
        {
          setPosition({
            latitude: responseJson.results[0].geometry.location.lat,
            longitude: responseJson.results[0].geometry.location.lng,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        }
        mapRef.current.animateToRegion(position, 3*1000);
    }).catch(err => console.log(err));
}
  
  return(
    <View >
    <View style={styles.container}>

     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      ref={mapRef}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
     >
     <Marker
     title='Yor are here'
     coordinate={position}/>
     </MapView>

     </View>

     <View style={styles.container}>
     <Button
        title="current location"
       
        onPress={current_location}
      />


      <View style={styles.inputView}>
      <TextInput 
      style={styles.input}
      placeholder="Input your location"
      onChangeText={text => GetLongitudeFromAddress(text)}
      />
  </View>

     </View>

      
   </View>
  )
  }
export default MapScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  last: {
    marginTop:"100px"
  },
  input: {
    // height: 50,
    // padding: 10,
    // marginTop: 10,
    // marginLeft: 10,
    // marginRight: 10,
    width:300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'black',
},
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // marginTop: "100px",
    ...StyleSheet.absoluteFillObject,
  },
});


