import { Container,ArrowForwardIcon, NativeBaseProvider, 
  Box, 
  Image,
  Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick} from 'react-native';
// import { getPickup } from '../Config';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';


const Reject = () => {


  const navigation = useNavigation();
 

  const DriverName = 'https://bked.logistiex.com/ADupdatePrams/getUPFR';

  const [DriverData, setDriverData] = useState([]);
  const [DropDownValue, setDropDownValue] = useState('');

  const datadekho = async() => {
      await fetch(DriverName)
      .then((response) => response.json()) 
      .then((json) => {
        setDriverData(json);
        console.log(json);
      })
      .catch((error) => alert(error)) 
    }

    const submitForm = () => {
      axios.post('https://bked.logistiex.com/postSPS', {
        MarkUndeliveredReason : DropDownValue,
        userID: "sdchs",
        shipmentId : 'rfher'
    })
        .then(function (response) {
            console.log(response.data, "hello");
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    useEffect(() => {
        datadekho();   
    }, []);
    
  return (
      <NativeBaseProvider>

      <Box flex={1} bg="#fff">


      <TouchableOpacity onPress={()=>navigation.navigate('pod')}>
       <View style={styles.normal}>
           <Text style={styles.text}>Reject Reason Code </Text>
       </View>
      </TouchableOpacity>
      
      <TouchableOpacity >
        <View style={styles.bt3}>


        <Picker
      selectedValue={DropDownValue}
      onValueChange={(value, index) => setDropDownValue(value)}
      mode="dropdown" // Android only
      style={styles.picker}
    >
      <Picker.Item label="Please select " value="Unknown" />
     
      {
        DriverData.map((d) => {
          return(
            <Picker.Item value={d.pickupFailureReasonGroupName} label={d.pickupFailureReasonName} key={d.pickupFailureReasonUserID}/>
          )
        })
      }
    </Picker>



        </View>
      </TouchableOpacity >
   
  
       <TouchableOpacity onPress={() => submitForm()}>
      <View style={styles.container}>
        <View style={styles.btn}>
          <Text style={styles.textbtn}>Submit</Text>
        </View>
      </View>
  </TouchableOpacity>
  
  

  <Center>
            <Image 
                style={{
                width:150, 
                height:150
                }}
                   source={require('../file/image.png')} alt={"Logo Image"}
            /> 
                
               
             
    </Center>
  </Box>
</NativeBaseProvider>
  );
};

export default Reject;

//Styles CSS

export const styles = StyleSheet.create({
  normal:{
      fontFamily:'open sans',
      fontWeight:'normal',
      fontSize:20,
      color:'#eee',
      marginTop:27,
      paddingTop:15,
      marginLeft:10,
      marginRight:10,
      paddingBottom:15,
      backgroundColor:'#eee',
      width: 'auto',
      borderRadius:0
  },

  text:{
    color:'#000',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'

  },
  main1:{
      backgroundColor:'#004aad',
      fontFamily:'open sans',
      fontWeight:'normal',
      fontSize:20,
      marginTop:27,
      paddingTop:15,
      marginLeft:10,
      marginRight:10,
      paddingBottom:15,
      width: 'auto',
      borderRadius:20
  },
  textbox1:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:18,
      width:'auto',
      flexDirection: "column",
      textAlign:'center'
  },

  textbtn:{
      alignSelf: 'center',
      color:'#fff',
      fontWeight:'bold',
      fontSize:18

    },

    btn:{
      fontFamily:'open sans',
      fontSize:15,
      lineHeight:10,
      marginTop:80,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:100,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:150


    },
    bt3: {
      fontFamily: 'open sans',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 10,
      marginTop: 0,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: 'white',
      width: 'auto',
      borderRadius: 10,
      paddingLeft: 0,
      marginLeft: 0,
      width:'45%'
  
    
    }

  });