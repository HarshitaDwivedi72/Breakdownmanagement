import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ProductName = ({route}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true)
  const [MiddleValue, setMiddleValue] = useState([]);
  const navigation = useNavigation();

  useEffect(() => 
 {
  (async() => {
    
  
      await axios.get(`https://bked.logistiex.com/DSQCPickupStart/startPickup?Client_Reference_No=${route.params.Client_Reference_No}`)
      .then((response) => {

          setMiddleValue(response.data.details);
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
          <Text style={styles.text}>{MiddleValue.Client_Name}</Text>
          <Text style={styles.text}>{route.params.Client_Reference_No}</Text>
        </View>
        
      </TouchableOpacity>

        <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>QC : Product Information </Text>
            <Text style={styles.text2}>{MiddleValue.productName}</Text>
          </View>
          <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>Reason of Return: Reason</Text>
          </View>
          <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>Brand: {MiddleValue.brand} </Text>
          </View>

          <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>Price: {MiddleValue.price} </Text>
          </View>

          <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>Category: {MiddleValue.category} </Text>
          </View>

          <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Text style={styles.text2}>size: {MiddleValue.size} </Text>
          </View>
         
        <View>
        <View  style={[styles.normal, {
          flexDirection: "row",
          alignItems:"center",
          justifyContent:"space-evenly",
          backgroundColor:"white"
        }]}>
          <TouchableOpacity onPress={() => navigation.navigate('QCreason')} >
          <Text style={[styles.text, {
            backgroundColor:"lightgreen",
            padding:5,
            borderRadius:10,
            fontWeight:"400"
          }]}>Marked QC Reject </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Camera', {
            Client_Reference_No : route.params.Client_Reference_No,
            Client_Name : MiddleValue.Client_Name
          })} >
          <Text style={[styles.text, {
            backgroundColor:"lightblue",
            padding:5,
            borderRadius:10,
            fontWeight:"400",
            width:150,
            alignSelf:"center",
            marginLeft:20
          }]}>start QC </Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <TouchableOpacity style={{justifyContent:"center"}} onPress={() => navigation.navigate('')}>

      <View style={styles.bt1}>
        {/* <FontAwesomeIcon icon={faQrcode } color="black" size={25} style={{marginLeft:8,marginTop:8}} /> */}
        <Text style={styles.text1}>Sync</Text>
      </View>

    </TouchableOpacity>
  
    <TouchableOpacity onPress={() => navigation.navigate('')}>
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

export default ProductName;

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