import { Container, NativeBaseProvider, Image, Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick, Alert} from 'react-native';
import {getPickup, getValidate, postScan} from './Config';
import { alignItems, width } from 'styled-system';
import { OtpPopup } from './ScanBorcode/OtpPopup';
import { Button, Center,Input, Modal } from "native-base";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee,faCheckCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ScanQrCode from './ScanBorcode/ScanQrCode';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const ShipmentBarcode = ({route}) => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [packageValue,setpackageValue] = useState("");
    const [otp,setOtp] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [pending, setPending] = useState(0)
    const [expected, setExpected] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [rejected, setRejected] = useState(0);  
    const [valuedekho, setvaluedekho] = useState('tanmay');

    const navigation = useNavigation();


    
    useEffect(()=>{
        axios.get(postScan)
            .then((res) => {
                console.log(res.data)
                setPending(res.data.pending)
                setExpected(res.data.expected)
                setAccepted(res.data.accepted)
                setRejected(res.data.rejected)
        }, (error) => {
            console.log(error);
        }); 
    },[refresh]);


    useEffect(() => {
      if(route.params  && valuedekho === 'shipment'){
        setBarcodeValue(route.params.barcode);
      }
      if(route.params  && valuedekho === 'package'){
        setpackageValue(route.params.barcode)
      }
    }, [barcodeValue, route]);

console.log(valuedekho, 'sdfsdfsdf')

// for otp
const reSendHandle=()=>{
console.log(otp)

    axios.post(getValidate,{barcodeData:barcodeValue,otp:otp})
    .then((response) => {
    console.log(response)
    if(response.status==200){
      setShowModal(false);
      alert(response.data.msg)
      setRefresh(refresh)
    }
    }, (error) => {
      console.log(error);
    });
}

    //POST Backend API



   const onSuccess = e => {
        console.log(e.data)
      
        
    axios.post(postScan,{barcodeData:e.data})
    .then((response) => {
     console.log(response.data.otp)

     if(response.status==201){
         setBarcodeValue(e.data)
         setShowModal(true)
         navigation.navigate('sign');

     }

   }, (error) => {
      console.log(error);
  }); 
      };
    return (
    
     <NativeBaseProvider>
     <Box flex={1} bg="#fff">
     <Container style={styles.containter}>
     <TouchableOpacity >
              <View style={styles.normal} >
                 <Text style={styles.text}>Scan Shipment Barcode</Text>
              </View>
    </TouchableOpacity>

     <ScrollView  style={styles.homepage}  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>


      <TouchableOpacity onPress={() => {
        setvaluedekho('shipment');
        navigation.navigate('NewBarcode')
      }}>
      <View style={[styles.normal, {
        marginTop:10,
        marginBottom:40
      }]}>
        <Text style={styles.text}>shipment ID   ----  {barcodeValue}</Text>

      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {
       setvaluedekho('package');
       navigation.navigate('NewBarcode');
    }}>
      <View style={[styles.normal, {
        marginTop:10,
        marginBottom:40
      }]}>
        <Text style={styles.text}>package ID   ----  {packageValue}</Text>

      </View>
    </TouchableOpacity>


      <TouchableOpacity onPress={()=>navigation.navigate('reject')}>
              <View style={styles.btn} >
                 <Text style={styles.btntext}>    Reject Shipment       </Text>
              </View>
    </TouchableOpacity>
      
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
            
        </ScrollView>
           {/* content end */}

     
      {/* save button */}
      <View style={styles.iconbar}>
 
        {/* <Button  startIcon={<FontAwesomeIcon icon={faCheckCircle} color="white" size={20} />} colorScheme="dark" >
         Sync
      </Button>
        <Button ml={109} startIcon={<FontAwesomeIcon icon={ faCheckCircle } color="white" size={20} />} onPress={() => navigation.navigate('pickupbarcode')}>
        Continue
      </Button> */}
     
     </View>
        {/* save button end */}



</Container>
</Box>

<Center>
          		<Image 
          			style={{
          			width:150, 
          			height:100
          			}}
          		       source={require('./file/image.png')} alt={"Logo Image"}
            	/>
     		 		
     				
    	   		
          </Center>
 </NativeBaseProvider>

    );
};

export default ShipmentBarcode;

//Styles CSS

export const styles = StyleSheet.create({
  containter:{
  
    margin:0,
    marginVertical:0,
    alignSelf:'center',
},

   normal:{

    fontFamily:'open sans',
    fontWeight:'normal',
    fontSize:20,
    color:'#eee',
    marginTop:20,
    paddingTop:10,
    marginLeft:10,
    marginRight:10,
    paddingBottom:10,
    backgroundColor:'#eee',
    width: 'auto',
    borderRadius:0
    
  },

    text:{
      marginLeft:20,
      marginRight:20,
      color:'#000',
      fontWeight:'normal',
      textAlign: 'center',
      fontSize:18

    },  

    btn:{

      
      marginTop:20,
      paddingBottom:10,
      paddingTop:10,
      backgroundColor:'#004aad',
      width: 'auto',
      borderRadius:20,
      
      
    },
  
      btntext:{
        paddingLeft:30,
        paddingRight:30,
        color:'#fff',
        fontWeight:'normal',
        textAlign: 'center',
        fontSize:16
  
      },  
    


    iconbar:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'stretch',
        width:280,
        
    },


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
     
      textAlign:'left',
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