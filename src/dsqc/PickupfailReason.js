import React, { useState } from 'react';
import { Container, NativeBaseProvider, Box } from 'native-base';
import { Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const PickupfailReason = ({route}) => {

    const initialState = {
        Pickup_Failure_Reason_1: false,
        Pickup_Failure_Reason_2: false,
        Pickup_Failure_Reason_3: false,
        Pickup_Failure_Reason_4: false,
      };

  const navigation = useNavigation();
  const [isSelected, setSelection] = useState("");
  const [state, setState] = React.useState(initialState);
  const [toggleButton, setToggleButton] = React.useState(false);

      console.log(state);

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
      
      <View style={styles.checkboxWrapper}>
      <CheckBox
        value={state.react}
        onValueChange={value =>
          setState({
            ...state,
            react: value,
          })
        }
      />
      <Text style={{color:"black"}}>Pickup Failure Reason 1</Text>
    </View>
    <View style={styles.checkboxWrapper}>
    <CheckBox
      value={state.next}
      onValueChange={value =>
        setState({
          ...state,
          next: value,
        })
      }
    />
    <Text style={{color:"black"}}>Pickup Failure Reason 2</Text>
  </View>
  <View style={styles.checkboxWrapper}>
    <CheckBox
      value={state.vue}
      onValueChange={value =>
        setState({
          ...state,
          vue: value,
        })
      }
    />
    <Text style={{color:"black"}}>Pickup Failure Reason 3</Text>
  </View>
  <View style={styles.checkboxWrapper}>
    <CheckBox
      value={state.angular}
      onValueChange={value =>
        setState({
          ...state,
          angular: value,
        })
      }
    />
    <Text style={{color:"black"}}>Pickup Failure Reason 4</Text>
  </View>

      
      </View>

   

    {toggleButton && (
        <View style={styles.resultContainer}>
          {Object.entries(state).map(([key, value]) => {
            return (
              value && (
                <View key={key} style={{paddingHorizontal: 5}}>
                  <Text style={{color:"black"}}>{key}</Text>
                </View>
              )
            );
          })}
        </View>
      )}


      <Button
      onPress={() => setToggleButton(toggleButton => !toggleButton)}
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