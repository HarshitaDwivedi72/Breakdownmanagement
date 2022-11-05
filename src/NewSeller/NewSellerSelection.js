import React, { useEffect, useState } from 'react';
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick, Alert, TouchableWithoutFeedbackBase} from 'react-native';
import call from 'react-native-phone-call';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const NewSellerSelection = ({route}) => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [showline, setLine] = useState(true)
    // const navigation = useNavigation();

    const [data,setData] = useState([]);
    const [order, setOrder] = useState([]);
    const [type,setType] = useState('delivery');
    const navigation = useNavigation();
    console.log(route.params.paramKey, 'dascsdc');

    const triggerCall=() =>{

        const args = {
          number: 'inputValue',
          prompt: true,
        }
        
        call(args).catch(console.error)
      };

    useEffect(() => 
   {
    (async() => {
        await axios.get(`https://bked.logistiex.com/SellerMainScreen/getSellerDetails/second001`)
        .then((res) => {
            setData(res.data)
    }, (error) => {
        alert(error);
    }); 



        await axios.get('https://bked.logistiex.com/SellerMainScreen/getCP/Tarun123')
        .then((res) => {
            setOrder(res.data)
    }, (error) => {
        alert(error);
    }); 

    }) ();
   }
  ,[])


  

    var new_data = [];
    new_data.push(data);

    console.log(new_data, 'sadcsdc');
    var TotalpickUp;
    var CompletePickUp;
   if(order.length){
    TotalpickUp = order[0].TotalPickups.length;
    CompletePickUp = order[0].CompletedPickups.length;
    console.log(TotalpickUp);
    console.log(CompletePickUp);
   }
   console.log(TotalpickUp - CompletePickUp );
   let net = TotalpickUp - CompletePickUp;

    return (
    <View>
    
    <TouchableOpacity onPress={()=>navigation.navigate('reject')}>
              <View style={styles.normal}>
                 <Text style={styles.text}>Seller Pickups  (Completed/Total) </Text>
              </View>
    </TouchableOpacity>
    <View style={styles.containter}>
         <ScrollView style={styles.homepage} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      {/* <View style={styles.searchbar}> 
         <Search/>    
        </View> */}
       
        <View style={styles.searchbar}> 
        </View>
      
    <View style={styles.iconbar}>
        <TouchableOpacity style={[styles.scanbtn,{borderBottomColor:showline==true?'black':'white'}]}
        onPress={()=>setLine(true)} ><Text style={{color:'#000'}}>{TotalpickUp}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.scanbtn2,{borderBottomColor:showline==false?'black':'white'}]} 
        onPress={()=>setLine(false)}><Text style={{color:'#000'}}>{net}</Text></TouchableOpacity>
     </View>

     <ScrollView>
     <View style={styles.containter}>
     <View  style={styles.mainbox}>
                    <TouchableOpacity>
                      <View style={styles.innerdown}>
                          <Text style={styles.fontvalue}>Seller Name</Text>
                          <Text style={styles.fontvalue}>{}</Text>
                      </View>
                      <View style={styles.innerdown}>
                          <Text style={styles.fontvalue}>Seller Address</Text>
                          <Text style={styles.fontvalue}>{}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.outerdown}>
                      <View style={styles.outer1}><Text style={{color:'#6DB1E1',fontWeight:'700'}} onPress={triggerCall}>Call Seller</Text></View>
                      <View style={styles.outer1}><Text style={{color:'#6DB1E1',fontWeight:'700'}}>Get Direction</Text></View>
                  </View>
              </View>
    </View>
     
     </ScrollView>

     <TouchableOpacity onPress={()=>navigation.navigate('ShipmentBarcode')}>
      	
      		<View style={styles.bt1}>
                   {/* <FontAwesomeIcon icon={faQrcode } color="black" size={25} style={{marginLeft:8,marginTop:8}} /> */}
      			<Text style={styles.text1}>Scan</Text>
      		</View>
          
    </TouchableOpacity>
    <TouchableOpacity  > 
            <View style={styles.bt2}>
      			<Text style={styles.text1}>Open Bag</Text>
      		</View>
            
    </TouchableOpacity>
    <TouchableOpacity  > 
            <View style={styles.bt3}>
      			<Text style={styles.text1}>Sync</Text>
      		</View>
            
    </TouchableOpacity>
    
    </ScrollView>
   

</View>

</View>
    );
};

export default NewSellerSelection;

export const styles = StyleSheet.create({

    scanbtn:{
        width:140,
        height:50,
        color:'white',
        borderBottomColor:'red',
        borderBottomWidth:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    scanbtn2:{
        width:140,
        height:50,
        color:'white',
        borderBottomColor:'green',
        borderBottomWidth:2,
        color:'white',
        marginLeft:2,
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
    },
    searchbar:{
        width:280
    },
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
      marginTop:30,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:100,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:0


    },
    bt2:{
      fontFamily:'open sans',
      fontSize:15,
      lineHeight:10,
      marginTop:-44,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#004aad',
      width:100,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:110


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
      width:100,
      borderRadius:10,
      paddingLeft:0,
      marginLeft:220
    },
    containter:{
      // backgroundColor:"black",
      // width:"100%",
      // margin:0,
      marginTop:30,
      marginVertical:0,
      alignSelf:'center',
  },

  mainbox:{
      width: 280,
      height:'auto',
      backgroundColor:'white',
      alignSelf:'center',
      marginVertical:20,
      borderRadius:20,
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
      justifyContent:'space-around',
      padding:10,
      
  },
  innerdown:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:10


  },
  outerdown:{
      flexDirection:'row',
      justifyContent:'space-around',
      paddingVertical:15,
      borderTopWidth:2,
      borderColor: '#F4F4F4',


  },
  fontvalue:{
      
      fontWeight:'700',
      color : "black"
  },

  container69: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 250
   },
gauge: {
  position: 'absolute',
  width: 100,
  height: 160,
  alignItems: 'center',
  justifyContent: 'center',
},
gaugeText: {
  backgroundColor: 'transparent',
  color: '#000',
  fontSize: 24,
}
    });