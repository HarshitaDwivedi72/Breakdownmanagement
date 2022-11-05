import { 
  ArrowForwardIcon, 
  NativeBaseProvider, 
  Box, 
  Image,
  Center } from 'native-base';

import{
StyleSheet,
Text,
TouchableOpacity,
View, 
ScrollView, 
TextInput,
getPick} from 'react-native';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

const getData = "https://bked.logistiex.com/SellerMainScreen/getSellerList/Tarun123";

const NewSellerPickup = () => {
  const [data,setData] = useState([]);
  const navigation = useNavigation();
  useEffect(()=>{
      axios.get(getData)
          .then((res) => {
              setData(res.data)
      }, (error) => {
          alert(error);
      }); 
  }, []);

  useEffect(() => 
   {
    (async() => {
        await axios.get(getData)
        .then((res) => {
            setData(res.data)
    }, (error) => {
        alert(error);
    });    
    }) ();
   }
  ,[])



  return (

      <NativeBaseProvider>

          <Box flex={1} bg="#fff">


          <TouchableOpacity>
           <View style={styles.normal}>
               <Text style={styles.text}>Seller Pickups  (Completed/Total) {data.deliveries}</Text>
           </View>
          </TouchableOpacity>
          <View style={styles.searchbar}> 
              {/* <Search/>     */}
          </View>
          <View style={styles.Container}>
           <View style={styles.main}>
               <Text style={styles.textbox}>Seller Name</Text>
           </View>
          
           <View style={styles.main}>
               <Text style={styles.textbox}>Forward Pickups</Text>
           </View>
          
           <View style={styles.main}>
               <Text style={styles.textbox}>Reverse Deliveries</Text>
           </View>
           
          </View>   

        <ScrollView style={styles.homepage} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false}>
          {data.map((single, i)=>(
          
          <TouchableOpacity key={i}  style={styles.mainbox} onPress={()=> navigation.navigate('NewSellerSelection',{
              paramKey : single.consignorCode
          })}>
           
            <View style={styles.innerdown}>
              <Text style={styles.fontvalue}>{single.consignorName}</Text>
              
              <Text style={styles.fontvalue}>{single.ForwardPickups}</Text>
              
              <Text style={styles.fontvalue}>{single.ReverseDeliveries}</Text>              
            </View>
          </TouchableOpacity>
      ))}
          
        </ScrollView>

        <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.bt1}>
          <Text style={styles.btnText}>Language</Text>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity>  
      <View style={styles.container}>
    
        <View style={styles.bt2}>
          <Text style={styles.btnText}>Sync</Text>
        </View>

      </View>
    </TouchableOpacity>	
    
      </Box>

      <Center>
            <Image 
              style={{
              width:150, 
              height:150
              }}
                   source={require('../file/image.png')} alt={"Logo Image"}
            />
            
           
           
        </Center>
    </NativeBaseProvider>
  );
};

export default NewSellerPickup;

//Styles CSS

export const styles = StyleSheet.create({


  normal:{
      fontFamily:'open sans',
      fontWeight:'normal',
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
    paddingLeft:30,
    color:'#000',
    fontWeight:'bold',
    fontSize:18

  },
  Container:{
      flexDirection:'row',
      margin:10,

  },
  main:{

      backgroundColor:'#004aad',
      width:120,
      marginLeft:10,

    },

 
  textbox:{
      fontFamily:'open sans',
      fontSize:15,
      lineHeight:20,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:0,
      color:'#fff',
      width:110,
      marginLeft:5,
     
  },
  
  homepage:{
      // backgroundColor:"blue",
  },
 

  mainbox:{
      width: 350,
      height:40,
      backgroundColor:'lightblue',
      alignSelf:'center',
      marginVertical:20,
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 1,
      // marginHorizontal:500
  },
  innerup:{
      flexDirection:'row',
      padding:10,
      
  },
  innerdown:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
     
  },
  
  fontvalue:{
      

      fontWeight:'700',
      
    
  },
  fontvalue1:{
      

      fontWeight:'700',
      marginTop : 10,
      marginLeft : 100,
      marginRight: -10
  },
  searchbar:{
      width:310
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
      marginLeft:10,
      marginVertical : 8

    },
    bt2:{
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
      marginLeft:260


    },

    btnText:{
      alignSelf: 'center',
      color:'#fff',
      fontSize:15

    }

   
  });