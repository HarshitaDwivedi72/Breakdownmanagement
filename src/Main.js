import React, { useEffect, useState } from "react"
import { Text, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Platform 
} from 'react-native';

import axios from 'axios'
import { Container,
  SmallCloseIcon,
  ArrowForwardIcon, 
  NativeBaseProvider, 
  Box, 
  Image,
  Center} from 'native-base';

import { useNavigation } from '@react-navigation/native';
  
const getData = "https://bked.logistiex.com/SellerMainScreen/getMSD/Tarun123";

const Main = () => {

  const[data, setData] = useState({});
  const [count, setcount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => 
  {
   (async() => {
       await axios.get(getData)
       .then((res) => {
           setData(res.data)
           if(res.data && res.data.consignorPickupsList){
            const all = res.data.consignorPickupsList;
            setcount(all.length);
          }
   }, (error) => {
       alert(error);
   }); 
   }) ();
  }
 ,[]);



  return (
    <NativeBaseProvider>
     <Box flex={1} bg="#004aad" alignItems="center" justifyContent="center">
     	<Box justifyContent="space-between" py={8} px={0}  bg="#fff" rounded="xl" width={375} maxWidth="100%">
      <TouchableOpacity onPress={()=>navigation.navigate('sendSMSFunction')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Customer Deliveries </Text>
      </View>
      </TouchableOpacity>
      
      <TouchableOpacity  onPress={()=>navigation.navigate('CustomerPickup')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Customer Pickups </Text>
      </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('SellerPickup')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Seller Deliveries </Text>
      </View>
      </TouchableOpacity>
      
      <TouchableOpacity  onPress={()=>navigation.navigate('NewSellerPickup')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Seller Pickups </Text>
        <Text style={styles.text}>{count}</Text>
      </View>
      </TouchableOpacity>
      
    
      <TouchableOpacity>
      	<View style={styles.container}>
      		<View style={styles.bt1}>
      			<Text style={styles.text1}>Language</Text>
      		</View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>  
        <View style={styles.container}>
      
      		<View style={styles.bt2}>
      			<Text style={styles.text1}>Sync</Text>
      		</View>

        </View>
      </TouchableOpacity>	
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <View style={styles.container}> 
      		<View style={styles.bt3}>
      			<Text style={styles.text1}>Logout</Text>
      		</View>
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
}



const styles = StyleSheet.create({

  main:{
      	backgroundColor:'#004aad'
   },
  normal:{
        fontFamily:'open sans',
        fontWeight:'normal',
        fontSize:20,
        color:'#323232',
        marginTop:27,
        marginBottom:-5, 
        marginLeft:30,
        marginRight:30, 
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#eee',
        width:'auto',
        borderRadius:0
    },

    text:{
      paddingLeft:30,
      color:'#000',
      fontWeight:'bold',
      fontSize:18

    },
    
    text1:{
      alignSelf: 'center',
      color:'#fff',
      fontWeight:'bold',
      fontSize:18

    },

    bt1:{
      fontFamily:'open sans',
      fontSize:15,
      lineHeight:10,
      marginTop:27,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:110,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:10


    },
   
   
     bt2:{
      fontFamily:'open sans',
      fontSize:15,
      lineHeight:10,
      marginTop:-44,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:110,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:130


    } , 

    bt3:{
      fontFamily:'open sans',
      color:'#000',
      fontWeight:'bold',
      fontSize:15,
      lineHeight:10,
      marginTop:-44,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:110,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:250


    }

    
});

export default Main;