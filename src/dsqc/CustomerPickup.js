import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box, Input } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import SelectList from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CustomerPickup = ({}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true)
  const [selected, setSelected] = useState("345678");
  const [data,setData] = useState([]);
  const [headerValue, setHeaderValue] = useState({});
  const [MiddleValue, setMiddleValue] = useState([]);
  const [keyword, setKeyword] = useState("")
  const navigation = useNavigation();

  useEffect(() => 
   {
    (async() => {
        await axios.get('https://bked.logistiex.com/DSQCCustomerList/allPincodes?BikerId=BI001')
        .then((response) => {
  
          let newArray = response.data.pincodes.map((item) => {
            return {key:  item, value: item}
          })
          setData(newArray)
        })
        .catch((e) => {
          console.log(e)
        })



        await axios.get(`https://bked.logistiex.com/DSQCCustomerList/returnStatus?CustomerPincode=${selected}`)
        .then((response) => {

            setHeaderValue(response.data);
        })
        .catch((e) => {
          console.log(e)
        })


        await axios.get(`https://bked.logistiex.com/DSQCCustomerList/customerList?CustomerPincode=${selected}`)
        .then((response) => {

            setMiddleValue(response.data.RSData);
        })
        .catch((e) => {
          console.log(e)
        })

    }) ();
   }
  ,[selected])
   console.log(MiddleValue, "data");


const searched = (keyword) => (c) => c.Customer_Name.includes(keyword);


  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center">
        		<Box justifyContent="space-between" mt={2} pb={10}   bg="#fff" rounded="xl" width={450} maxWidth="98%"
        	 	  _text={{
          			fontWeight: "medium",
      			  }}>
     
   
       {headerValue && headerValue.returnStatus ? (
         <TouchableOpacity>
         <View  style={[styles.normals, {
           flexDirection: "row",
           alignItems:"center",
           justifyContent:"space-around"
         }]}>
           <View>
           <Text style={styles.text}>Picked  </Text>
           <Text style={styles.text}>{headerValue.returnStatus.pickedShipments}  </Text>
           </View>
           <View>
           <Text style={styles.text}>Rejected  </Text>
           <Text style={styles.text}>{headerValue.returnStatus.rejectedShipments}</Text>
           </View>
           <View>
           <Text style={styles.text}>Failed  </Text>
           <Text style={styles.text}>{headerValue.returnStatus.failedShipments}</Text>
           </View>
           <View>
           <Text style={styles.text}>Pending  </Text>
           <Text style={styles.text}>{headerValue.returnStatus.pendingShipments}</Text>
           </View>
         </View>
         
       </TouchableOpacity>
       ): (
        <TouchableOpacity>
        <View  style={[styles.normals, {
          flexDirection: "row",
          alignItems:"center",
          justifyContent:"space-around"
        }]}>
          <View>
          <Text style={styles.text}>Picked  </Text>
          <Text style={styles.text}>0</Text>
          </View>
          <View>
          <Text style={styles.text}>Rejected  </Text>
          <Text style={styles.text}>0</Text>
          </View>
          <View>
          <Text style={styles.text}>Failed  </Text>
          <Text style={styles.text}>0</Text>
          </View>
          <View>
          <Text style={styles.text}>Pending  </Text>
          <Text style={styles.text}>0</Text>
          </View>
        </View>
        
      </TouchableOpacity>
       )}

        <TouchableOpacity>
        <View  style={[styles.normals, {
          flexDirection: "row",
          justifyContent:"space-evenly",
          alignItems : "center",
          height:100
        }]}>
          <SelectList setSelected={setSelected} data={data} onSelect={() => setSelected(selected)} dropdownStyles={{backgroundColor:"gray"}} dropdownItemStyles={{marginLeft:10}} dropdownTextStyles={{color:"white"}}  />
           
        </View>
        
      </TouchableOpacity>

      <Input type="search" placeholder='Filter' value={keyword} className="form-control mb-4 container pt-4"
                onChangeText={(e) => setKeyword(e)}
                 />

        
        <TouchableOpacity>
          <View style={[styles.normals, {
            marginTop:15,
            backgroundColor:"grey"
          }]}>
            <Text style={[styles.text, {
                marginTop:10
            }]}>{selected} </Text>
          </View>
        </TouchableOpacity>

        <ScrollView
  contentContainerStyle={{width: '100%', alignItems: 'center'}}>

  
  {MiddleValue.length > 0 ? (
     MiddleValue.filter(searched(keyword)).map((item, index) => (
       <TouchableOpacity key={index}  onPress={() => navigation.navigate("Qcrequired", {
        PinCode : selected,
        pickedShipments : headerValue.returnStatus.pickedShipments,
        rejectedShipments :headerValue.returnStatus.rejectedShipments,
        failedShipments: headerValue.returnStatus.failedShipments,
        pendingShipments :headerValue.returnStatus.pendingShipments,
        Client_Reference_No : item.Client_Reference_No,
        client_name : item.Client_Name

       })} >
         <View style={{height: 200, width: 350, backgroundColor: 'grey', marginBottom: 10, marginTop:10}}>
            <Text>Customer Pickup</Text>
          <Text>
          {item.Customer_Name}
          </Text>
          <Text>
          {item.Customer_Address}
          </Text>
          <Text>
          {item.Client_Reference_No}
          </Text>
          <Text>
          {item.Client_Name}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} >
          <Text>navigation</Text>
          </TouchableOpacity>
        </View>
       </TouchableOpacity>
      ))
  ) : (
    <Text>dscfsdf</Text>
  )}

</ScrollView>
       
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

export default CustomerPickup;

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
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
 

});