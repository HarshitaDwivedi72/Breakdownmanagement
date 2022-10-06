import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box, Input } from 'native-base';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const QCreason = ({route}) => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true);
  const [MiddleValue, setMiddleValue] = useState({});
  const [question, setQuestion] = useState([]);
  const [remark, setRemark] = useState('');
  const navigation = useNavigation();


useEffect(() => 
{
 (async() => {

     await axios.get(`https://bked.logistiex.com/DSQCQualityCheck/QualityCheckQuestions?shipmentId=700000680505`)
     .then((response) => {

         setMiddleValue(response.data);
     })
     .catch((e) => {
       console.log(e)
     })

 }) ();
}
,[])

const HandleYesNo = (i, d, pp) => {
  let check = false
  const newarray = question.map(ss => {
    if(ss.pp == pp){
      check = true
      setQuestion([{...ss, i}]);
      return;
    }
  })
  if(check){
    setQuestion([
      ...question
    ])
  }else{
    setQuestion([
      ...question,
      {i,d,pp}
    ])
  }
  
}

const HandlerSubmit = () => {
  axios.post('https://bked.logistiex.com/DSQCPickupStart/postReject', {
    shipmentId : "700000680506",
    qualityCheckQues : question,
    AdditionalRemarks : remark

})
  .then(function (response) {
      console.log(response.data, "hello");
  })
  .catch(function (error) {
      console.log(error);
  });
}

const HandlerSubmits = async() => {
  await axios.post('https://bked.logistiex.com/DSQCPickupStart/postReject', {
    shipmentId : "700000680506",
    qualityCheckQues : question,
    AdditionalRemarks : remark

})
  .then(function (response) {
      console.log(response.data, "hello");
  })
  .catch(function (error) {
      console.log(error);
  });

  navigation.navigate('Barcode', {
    Client_Name : route.params.Client_Name,
    Client_Reference_No : route.params.Client_Reference_No
  })

}


console.log(remark, 'rsdfsdfc')

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
          justifyContent:"space-evenly",
          marginBottom:20
        }]}>
          <Text style={styles.text}>{route.params.Client_Name}  </Text>
          <Text style={styles.text}>{route.params.Client_Reference_No}</Text>
        </View>
        
      </TouchableOpacity>

      {
        MiddleValue && MiddleValue.details && MiddleValue.details.qualityCheckQues &&
        MiddleValue.details.qualityCheckQues.map((d, i) => {
          return (
            <View key={i} style={[styles.normals, {
              flexDirection: "row",
              alignItems:"center",
              justifyContent:"space-evenly",
              marginBottom:5
          }]}>
              <Text style={styles.text}>{d}  </Text>
              <Button onPress={() => HandleYesNo('true', d, i)} title='Yes' style={styles.text} />
              <Button onPress={() => HandleYesNo('false', d, i)} title='No' style={styles.text} />
            </View>
          )
        })
      }

        
      {/* <View  style={[styles.normals, {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:5
    }]}>
        <Text style={styles.text}>QC question 1  </Text>
        <Text style={styles.text}>Yes  </Text>
        <Text style={styles.text}>No  </Text>
      </View>

      <View  style={[styles.normals, {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:1
    }]}>
        <Text style={styles.text}>QC question 2  </Text>
        <Text style={styles.text}>Yes  </Text>
        <Text style={styles.text}>No  </Text>
      </View>

      <View  style={[styles.normals, {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:1
    }]}>
        <Text style={styles.text}>QC question 3  </Text>
        <Text style={styles.text}>Yes  </Text>
        <Text style={styles.text}>No  </Text>
      </View>

      <View  style={[styles.normals, {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:1
    }]}>
        <Text style={styles.text}>QC question 4  </Text>
        <Text style={styles.text}>Yes  </Text>
        <Text style={styles.text}>No  </Text>
      </View>

      <View  style={[styles.normals, {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:1
    }]}>
        <Text style={styles.text}>QC question 5  </Text>
        <Text style={styles.text}>Yes  </Text>
        <Text style={styles.text}>No  </Text>
      </View> */}
     
        <TouchableOpacity>
        <View style={[ {
            backgroundColor:"white",
            marginTop:35,
            marginLeft:20
        }]}>
            <Input onChangeText={e => setRemark(e)} placeholder='Additional Remark if any' ></Input>
          </View>

      </TouchableOpacity>

      <View>
        <View  style={[styles.normal, {
          flexDirection: "row",
          alignItems:"center",
          justifyContent:"space-evenly",
          backgroundColor:"white"
        }]}>
          <TouchableOpacity onPress={() => HandlerSubmit()} >
          <Text style={[styles.text, {
            backgroundColor:"lightgreen",
            padding:5,
            borderRadius:10,
            fontWeight:"400"
          }]}>Marked QC Reject </Text>
          </TouchableOpacity>

         <TouchableOpacity onPress={() => HandlerSubmits()} >
         <Text style={[styles.text, {
            backgroundColor:"lightblue",
            padding:5,
            borderRadius:10,
            fontWeight:"400",
            width:150,
            alignSelf:"center",
            marginLeft:20
          }]}>Mark as QC Done</Text>
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

export default QCreason;

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