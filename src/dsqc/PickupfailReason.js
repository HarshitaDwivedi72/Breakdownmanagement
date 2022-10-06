import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box } from 'native-base';
import { Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { cond } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

const PickupfailReason = ({route}) => {

    const initialState = {
        // Pickup_Failure_Reason_1: false,
        // Pickup_Failure_Reason_2: false,
        // Pickup_Failure_Reason_3: false,
        // Pickup_Failure_Reason_4: false,
      };

  const navigation = useNavigation();
  const [state, setState] = React.useState(initialState);
  const [MiddleValue, setMiddleValue] = useState([]);
  const [toggleButton, setToggleButton] = React.useState(false);

  const [VehicleTypesss, setVehicleTypesss] = useState('');

      


      useEffect(() => 
      {
       (async() => {
         
       
           await axios.get(`https://bked.logistiex.com/ADupdatePrams/getUPFR`)
           .then((response) => {
     
               setMiddleValue(response.data);
           })
           .catch((e) => {
             console.log(e)
           })
     
       }) ();
      }
     ,[])
     


     const HandlerSubmit = () => {
      axios.post('https://bked.logistiex.com/DSQCPickupFailed/postFailure', {
        shipmentId : "700000680503",
        failureReason : VehicleTypesss
    
    })
      .then(function (response) {
          console.log(response.data, "hello");
      })
      .catch(function (error) {
          console.log(error);
      });
    }


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
            justifyContent:"space-around"
          }]}>
            <View>
            <Text style={styles.text}>Picked  </Text>
            <Text style={styles.text}>{route.params.pickedShipments}</Text>
            </View>
            <View>
            <Text style={styles.text}>Rejected  </Text>
            <Text style={styles.text}>{route.params.rejectedShipments}</Text>
            </View>
            <View>
            <Text style={styles.text}>Failed  </Text>
            <Text style={styles.text}>{route.params.failedShipments}</Text>
            </View>
            <View>
            <Text style={styles.text}>Pending  </Text>
            <Text style={styles.text}>{route.params.pendingShipments}</Text>
            </View>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity>
        <View  style={[styles.normals, {
          flexDirection: "row",
          alignItems:"center",
          justifyContent:"space-evenly"
        }]}>
          <Text style={styles.text}>{route.params.client_name}</Text>
          <Text style={styles.text}>{route.params.Client_Reference_No}</Text>
        </View>
        
      </TouchableOpacity>

      <View style={{color:"black"}}>

        {/* {
          MiddleValue.map((d) => {
            return(
              <View style={styles.checkboxWrapper}>
            <CheckBox
              value={d.pickupFailureReasonName}
              onValueChange={value =>
                setState({
                  ...state,
                  react: value,
                })
              }
            />
            <Text style={{color:"black"}}>{d.pickupFailureReasonName}</Text>
          </View>
            )
          })
        } */}

<View style={{backgroundColor:'grey', height:80}}>
                <Picker
        selectedValue={VehicleTypesss}
        onValueChange={(value, index) => setVehicleTypesss(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Please select " value="Unknown" />
       
        {
          MiddleValue.map((d) => {
            return(
              <Picker.Item label={d.pickupFailureReasonName} value={d.pickupFailureReasonName} />
            )
          })
        }
      </Picker>
</View>

      
      </View>

      <Button
      disabled ={VehicleTypesss.length == 0}
      onPress={() => HandlerSubmit()}
      title="Submit"
    />

    <TouchableOpacity style={{justifyContent:"center", marginTop:50}} onPress={() => navigation.navigate('')}>

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

export default PickupfailReason;

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor:"grey"
  },

  

});