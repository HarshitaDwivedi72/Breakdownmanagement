import React, { useEffect, useState } from 'react';
import { Container, ArrowForwardIcon, NativeBaseProvider, Box, Center, Image , VStack, Input,} from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput,getPick, Alert } from 'react-native';
// import { faBarcode, faQrcode } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import PickupDashboard  from './PickupDashboard';
// import { Graph } from './Graph';
// import * as RNFS from 'react-native-fs';
// import { parse } from 'react-native-svg';
// import SearchBar, { Searchbar } from './SearchBar';
import { borderColor } from 'styled-system';
import { Picker } from '@react-native-picker/picker';



const GateInOperationDriver = ({route}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true);
  const [VehicleSeal, setVehicleSeal] = useState("");

  const navigation = useNavigation();


    // TripSheetId : route.params.TripSheetId,
  // Trip : route.params.Trip,
  // Vehical : route.params.Vehical,
  // DriverNames : route.params.DriverNames,
  // DriverPhone : route.params.DriverPhone


  // "Tripid": "TI1DC",                                   --- 
  // "TripsheetId":"TSI01DEL-BEN",                        --- 
  // "DriverName01": "Ravi",                             ----
  // "Driver01MobilePrimary": "9876543219",               ---
  // "VehicleType" : "Truck",                             ---
  // "VehicleNumber01": "DL020304",                       ----
  // "VendorDetails": "SKTravels",                        
  // "GpsTagId": "02:44",
  //cd 


  // TripSheetId : route.params.TripSheetId,
  // Trip : route.params.Trip,
  // Vehical : route.params.Vehical,
  // DriverNames : route.params.DriverNames,
  // DriverPhone : route.params.DriverPhone,
  // VendorDetails : route.params.VendorDetails,
  // VehicleNumber01 : route.params.VehicleNumber01,
  // VehicleType : route.params.VehicleType,
  // NumberofBagsTransferred : BagsTransferred



//   "Tripid": "TI1DC", -------
// "TripsheetId":"TSI01DEL-BEN", ----------
// "DriverName01": "Ravi",   -----------
// "Driver01MobilePrimary": "9876543219",     ----------
// "VehicleType" : "Truck",       -----------
// "VehicleNumber01": "DL020304",       ----------
// "VendorDetails": "SKTravels",     ----------
// "GpsTagId": "02:44",
// "NumberofBagsTransferred" : "1200",  ---------
// "NewSealNumber" : "1200",    -----------
// "TripDetails" : "DreamTrip"  ------

console.log("sdsdv", route);

  const FinalSumbit = () => {
    
    //"Tripid" :"TI12DC",
    // 02:44
          axios.post('https://bked.logistiex.com/TAUpdateNewVehicles/postUNV', {
                  TripSheetId : route.params.TripSheetId,
                  Tripid : route.params.Trip,
                  DriverName01 : route.params.DriverNames,
                  Driver01MobilePrimary : route.params.DriverPhone,
                  VehicleType : route.params.VehicleType,
                  VehicleNumber01 : route.params.VehicleType,
                  VendorDetails : route.params.VendorDetails,
                  NumberofBagsTransferred : route.params.NumberofBagsTransferred,
                  NewSealNumber : VehicleSeal,
                  TripDetails : "sdvsv",
                  GpsTagId : "vdv"

            })
                .then(function (response) {
                    console.log(response.data, "hello");
                })
                .catch(function (error) {
                    console.log(error);
                });
    
         
      };
    


  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center" justifyContent="center">
        		<Box justifyContent="space-between" py={4} px={2}  bg="#fff" rounded="xl" width={350} maxWidth="93%"
        	 	  _text={{
          			fontWeight: "medium",
      			  }}>
     
   
        <TouchableOpacity >
          <View style={styles.normal}>
            <Text style={styles.text}> Breakdown Management </Text>
          </View>
        </TouchableOpacity>

     

        <View style={styles.mainbox}>
             <View style={styles.smallbox}>
                <Text style={styles.text2}>Tripsheet Id</Text>
                <Text style={styles.text4}>{route.params.TripSheetId}</Text>
              </View>
          
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Vendor</Text>
                <Text style={styles.text4}>{route.params.VendorDetails}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Vehicle Type</Text>
                <Text style={styles.text4}>{route.params.VehicleType}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Vehicle Number</Text>
                <Text style={styles.text4}>{route.params.VehicleNumber01}</Text>

              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>No of Bags Transferred</Text>
                <Text style={styles.text4}>
                    {route.params.NumberofBagsTransferred}
                </Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Input Vehicle Seal no</Text>
                <TextInput onChangeText={value => setVehicleSeal(value)} style={styles.text1} placeholder='Input'></TextInput>
              </View>

            </View>
          
        <Container style={styles.containter}>
      
        <View style={styles.bt2}>

  <Text style={styles.text3} onPress={() => FinalSumbit()}>Submit</Text>
</View>
         

        </Container>
        </Box>
      		{/* <Center>
          		<Image 
          			style={{
          			width:150, 
          			height:150
          			}}
          		       source={require('./file/logo.png')} alt={"Logo Image"}
          		/>
     		 		
     				
    	   		
          </Center> */}
               
      	  </Box>
    </NativeBaseProvider>
  );
};

export default GateInOperationDriver;

export const styles = StyleSheet.create({

  scanbtn: {
    width: 140,
    height: 50,
    color: 'white',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  scanbtn2: {
    width: 140,
    height: 50,
    color: 'white',
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    color: 'white',
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  iconbar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: 280,
    // backgroundColor:'green'
  },
  containter: {

    marginTop: 100,
    marginVertical: 0,
    // alignSelf: 'center',
    marginLeft:20
  },
 
  searchbar: {
    width: '95%',
    marginTop:10,
    marginLeft:8,
  },
  normal: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 20,
    paddingTop: 15,
    marginLeft: 0,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
    width: '100%',
    borderRadius: 5
  },
  normal1: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 0,
    paddingTop: 15,
    marginLeft: 0,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: 'yellow',
    width: '100%',
    borderRadius: 5,
    
  },

  text: {
    alignSelf: 'center',
    // paddingLeft: 30,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18

  },
  text11: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18

  },

  bt1: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -64,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 0


  },
  bt2: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -44,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 120,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 80


  },
  bt3: {
    fontFamily: 'open sans',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -64,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 170

},  
mainbox:{
  marginTop:10,
  alignItems:'stretch'
},
smallbox:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
padding:5,
marginLeft:5,
  margin:15,
  
  backgroundColor:'white',
 
  },
  text1: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#ADD8E6',
    width: 100,
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: 50,
    width:'45%'
  },

text3: {
  alignSelf: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18
},
text2:{

    color:'#000',
 
   
  },
  text4:{
  
    marginLeft:200,
    marginRight:10,
    color:'#000',
    fontWeight:'normal',
    textAlign: 'center',
    fontSize:15,
    marginTop:-5
  
   
  },
 

});