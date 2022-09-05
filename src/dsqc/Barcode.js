import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box, Input } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Barcode = ({route}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true)
  const navigation = useNavigation();

  
  const [OTP, setOTP] = useState('');
  
  const generateOTP = () => {
  const characters =
    '0123456789';
  const characterCount = characters.length;
  let OTPvalue = '';
  for (let i = 0; i < 4; i++) {
    OTPvalue += characters[Math.floor(Math.random() * characterCount)];
  }
  setOTP(OTPvalue);
 
  return OTPvalue;
};
const r = OTP;
console.log(r);
 
const sendSmsOtp = async (mobileNumber, otp) => {
  const ottp =  generateOTP();
  const url = 'https://bked.logistiex.com/SMS/msg';
  let returnData;
  console.log('send sms otp', mobileNumber, ottp);
  const bodyData = {
    "mobileNumber" : "918955593269",
    "otp" :  ottp
  };
  const response = await axios.post(url, bodyData);
  console.log('send sms response', response);
  if (response.status === 200) {
    returnData = {
      status: 'Success',
      ...response.data,
    };
  } else {
    returnData = {
      status: 'Failure',
    };
  }
}

  
  useEffect(() => {
    if(route.params){
      setBarcodeValue(route.params.barcode);
    }
  }, [barcodeValue, route]);

  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center">
        		<Box justifyContent="space-between" mt={8} pb={10}   bg="#fff" rounded="xl" width={550} maxWidth="90%"
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
      <TouchableOpacity>
        <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <TouchableOpacity onPress={() => sendSmsOtp()}>
            <Text style={styles.text2}>Input OTP sent:</Text>
            </TouchableOpacity>
            <Input  keyboardType='numeric' placeholderTextColor="blue" placeholder="pin" />
          </View>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('')}>
          <View style={[styles.normals, {
            display:"flex",
            alignItems:"center",
            marginTop:15,
            backgroundColor:"lightblue",
            marginBottom:20,
            width:100
          }]}>
            <Text style={[styles.text, {
                marginTop:10
            }]}>submit</Text>
          </View>
        </TouchableOpacity>
        
    <TouchableOpacity>
        <View style={[ {
            backgroundColor:"white",
            marginTop:5,
            marginLeft:20,
            marginBottom:30
        }]}>
            <TouchableOpacity onPress={() => sendSmsOtp()}>
            <Text style={styles.text2}>resend otp</Text>
            </TouchableOpacity>
          </View>

      </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('NewBarcode')}>
      <View style={[styles.normal, {
        marginTop:10,
        marginBottom:40
      }]}>
        <Text style={styles.text}>Scan/Input Shipment Barcode</Text>

      </View>
    </TouchableOpacity>
    
    <View style={[styles.normal, {
        marginTop:10,
        marginBottom:40,
        backgroundColor:"white"
      }]}>
        <Text style={styles.text}>{barcodeValue}</Text>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate('')}>
      <View style={[styles.normal, {
        marginTop:10,
        marginBottom:40
      }]}>
        <Text style={styles.text}>Submit</Text>

      </View>
    </TouchableOpacity>

      <TouchableOpacity style={{justifyContent:"center"}}>

      <View style={styles.bt1}>
        <Text style={styles.text1}>Sync</Text>
      </View>

    </TouchableOpacity>
  
    <TouchableOpacity>
      <View style={styles.bt3}>
        <Text style={styles.text1}>Language</Text>
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

export default Barcode;

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