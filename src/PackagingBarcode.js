import { Container,ArrowForwardIcon, NativeBaseProvider, Image, Box, Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick, Alert} from 'react-native';
import {getPickup, getValidate, postScan} from './Config'
import { width } from 'styled-system';
import { Button,Input, Modal } from "native-base"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee,faCheckCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import ScanQrCode from './ScanBorcode/ScanQrCode';

const Scanbarcode = () => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [refresh, setRefresh] = useState(false)
    const [expected, setExpected] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [rejected, setRejected] = useState(0)
    const [pending, setPending] = useState(0)
    const navigation = useNavigation();


    
    // useEffect(()=>{
    //     axios.get(postScan)
    //         .then((res) => {
    //             console.log(res.data)
    //             setExpected(res.data.expected)
    //             setAccepted(res.data.accepted)
    //             setRejected(res.data.rejected)
    //             setPending(res.data.pending)
    //     }, (error) => {
    //         console.log(error);
    //     }); 
    // },[refresh])

   const onSuccess = e => {
    console.log(e.data)
  
    
axios.post(postScan,{barcodeData:e.data})
.then((response) => {
 console.log(response.data.otp)

//  if(response.status==201){
//      setBarcodeValue(e.data)
//      setShowModal(true)
//      navigation.navigate('sign');

//  }

}, (error) => {
  console.log(error);
}); 
  };

  return (
    <NativeBaseProvider>
    <Box flex={1} bg="#fff">
    <Container style={styles.containter}>
    <TouchableOpacity onPress={()=>navigation.navigate('reject')}>
              <View style={styles.normal} >
                 <Text style={styles.text}>         Scan Shipment Barcode          </Text>
              </View>
    </TouchableOpacity>
        {/* <View style={styles.iconbar}>
     <Image style={styles.photo1} source={require('./file/close2.png')} />
     <Image style={styles.photo2} source={require('./file/reload2.png')} />
     </View> */}
    <View style={styles.iconbar}>
        <TouchableOpacity style={styles.scanbtn} ><Text style={{color:'white'}}>Scan is</Text></TouchableOpacity>
        <TouchableOpacity style={styles.scanbtn2} ><Text style={{color:'#549ee3'}}>Manually</Text></TouchableOpacity>
     </View>
     <View style={{flex: 1,width:280,height:500,marginTop:20,overflow:'hidden'}}>
     <QRCodeScanner
        onRead={onSuccess}
        containerStyle={{flex: 1,width:280,height:500,marginTop:20}}
        // flashMode={false}
        // flashMode={RNCamera.Constants.FlashMode.torch}

      />
      </View>

      {/* content start */}
      <View style={styles.mainbox}>
              <View style={styles.smallbox}>
                <Text style={styles.text1}>Expected</Text>
                <Text style={styles.text1}>{expected}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Accepted</Text>
                <Text style={styles.text2}>{accepted}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text3}>Rejected</Text>
                <Text style={styles.text3}>{rejected}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text3}>Not Handed Over</Text>
                <Text style={styles.text3}>{pending}</Text>
              </View>
            </View>
           {/* content end */}

     
      {/* save button */}
      <View style={styles.iconbar}>
 
        <Button  startIcon={<FontAwesomeIcon icon={faMapMarkerAlt } color="red" size={20} />} colorScheme="dark" >
         Sync
      </Button>
        <Button ml={1} startIcon={<FontAwesomeIcon icon={ faCheckCircle } color="white" size={20} />} >
         Continue
      </Button>
     
     </View>
        {/* save button end */}


</Container>
</Box>
<Center>
          		<Image 
          			style={{
          			width:150, 
          			height:150
          			}}
          		       source={require('./file/image.png')} alt={"Logo Image"}
            	/>
     		 		
     				
    	   		
          </Center>
</NativeBaseProvider>
    );
};

export default Scanbarcode;

//Styles CSS

export const styles = StyleSheet.create({
  normal:{

    fontFamily:'open sans',
    fontWeight:'normal',
    fontSize:20,
    color:'#eee',
    marginTop:20,
    paddingTop:15,
    marginLeft:10,
    marginRight:10,
    paddingBottom:15,
    backgroundColor:'#eee',
    width: 'auto',
    borderRadius:0
    
  },

    text:{
      paddingLeft:30,
      paddingRight:30,
      color:'#000',
      fontWeight:'bold',
      fontSize:18

    },  
 
    scanbtn:{
        width:140,
        height:50,
        borderRadius:10,
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#549ee3'
    },
    scanbtn2:{
        width:160,
        height:50,
        borderRadius:10,
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },

    iconbar:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'stretch',
        width:280,
        // backgroundColor:'green'
    },
    containter:{
        marginTop:0,
        marginVertical:0,
        alignSelf:'center',
        width:'100%',
    },
    // homepage:{
    //     backgroundColor:'white',  
    //     width:300
       
    // },

    innerup:{
        flexDirection:'row',
        padding:10,
        
    },
    innerdown:{
        flexDirection:'row',
        justifyContent:'space-around',

    },
    fontvalue:{
        
        fontWeight:'700',
      
    },
    mainbox:{
        marginTop:0,
        alignItems:'stretch'
      },
    smallbox:{
        justifyContent:'center',
        textAlign:'justify',
        alignItems:'center',
        margin:20
      },
    text1:{
        color:'#000'
      },
    text2:{
        color:'#000'
      },
    text3:{
        color:'#000'
      },
  
    });
