import React, { useEffect, useState, version } from 'react';
import { Container, NativeBaseProvider, Box } from 'native-base';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  data.append('file', {
    name: photo.assets[0].fileName,
    type: photo.assets[0].type,
    uri: Platform.OS === 'ios' ? photo.assets[0].uri.replace('file://', '') : photo.assets[0].uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  
  return data;
};

const Camera = ({}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true)
  const [MiddleValue, setMiddleValue] = useState([]);
  const [toggleButton, setToggleButton] = React.useState(false);

  const [VehicleTypesss, setVehicleTypesss] = useState('');
  const navigation = useNavigation();

  const [photo, setPhoto] = React.useState(null);
  const [count, setcount] = useState(0);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  console.log(photo, 'photo')

  if(photo){
    const result = createFormData(photo);
    console.log(result._parts[0], 'sgfdsf')
  }

  const handleUploadPhoto = async() => {
    await axios.post(`https://bked.logistiex.com/DSQCPicture/uploadPicture?shipmentId=SI001&userID=UI001&hubFacilityId=HI001&clientReferenceNo=CI001`, {
      file : createFormData(photo)._parts[0]
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };


  useEffect(() => 
      {
       (async() => {
         
       
           await axios.get(`https://bked.logistiex.com/ADpics/photosList`)
           .then((response) => {
     
               setMiddleValue(response.data);
           })
           .catch((e) => {
             console.log(e)
           })
     
       }) ();
      }
     ,[])
     


  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center">
        		<Box justifyContent="space-between" mt={2} pb={10}   bg="#fff" rounded="xl" width={450} maxWidth="98%"
        	 	  _text={{
          			fontWeight: "medium",
      			  }}>
     


        <TouchableOpacity>
        <View  style={[styles.normals, {
          flexDirection: "row",
          alignItems:"center",
          justifyContent:"space-evenly"
        }]}>
          <Text style={styles.text}>Client Name  </Text>
          <Text style={styles.text}>Client Reference No  </Text>
        </View>
        
      </TouchableOpacity>

      <View style={{backgroundColor:'grey', height:80}}>
                <Picker
        selectedValue={VehicleTypesss}
        onValueChange={(value, index) => setVehicleTypesss(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Please select " value="Unknown" />
       
        {
          MiddleValue.map((d, i) => {
            return(
              <Picker.Item key={i} label={d} value={d} />
            )
          })
        }
      </Picker>
</View>

        
       {
        VehicleTypesss.length>0 && VehicleTypesss != 'Unknown' && (
          <View style={{ alignItems:"center",
          justifyContent:"space-evenly"}} >
          <Button title='open camera' onPress={() =>{
            setcount(count+1);
             navigation.navigate('NewCamera',{
              value : VehicleTypesss,
              count : count
            })
  
          }} />
          
          </View>
        )
       }

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.assets[0].uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>

    
     
          {/* <TouchableOpacity onPress={() => navigation.navigate('Barcode', {
            Client_Reference_No : route.params.Client_Reference_No,
            Client_Name : route.params.Client_Name
          })}>
          <View style={[styles.normal, {
            marginTop:10,
            marginBottom:40
          }]}> */}
            <Text style={styles.text}>Next</Text>
          {/* </View>
        </TouchableOpacity> */}


      <TouchableOpacity style={{justifyContent:"center"}} onPress={() => navigation.navigate('')}>

      <View style={styles.bt1}>
        {/* <FontAwesomeIcon icon={faQrcode } color="black" size={25} style={{marginLeft:8,marginTop:8}} /> */}
        <Text style={styles.text1}>Sync</Text>
      </View>

    </TouchableOpacity>
 
    <TouchableOpacity onPress={() => navigation.navigate('')}>
      <View style={styles.bt3}>
        <Text style={styles.text1}>Log Out</Text>
      </View>

    </TouchableOpacity>

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

export default Camera;

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
    width: 280
  },
  normal: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 50,
    paddingTop: 15,
    marginLeft: 17,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
    width: '90%',
    borderRadius: 5
  },
  normals: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 10,
    paddingTop: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
    width: '95%',
    borderRadius: 5,
    
  },

  text: {
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    
  },
  text2: {
    // alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    
  },
  text1: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },

  bt1: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: -20


  },
  bt2: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -44,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 90


  },
  bt3: {
    fontFamily: 'open sans',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -44,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 200


  },

});