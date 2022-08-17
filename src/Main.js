import React, { useEffect, useState } from 'react';
import { Container, NativeBaseProvider, Box, Center, Image } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Main = () => {

  const [barcodeValue, setBarcodeValue] = useState("");
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center" justifyContent="center">
        		<Box justifyContent="space-between" py={4} px={2}  bg="#fff" rounded="xl" width={350} maxWidth="93%"
        	 	  _text={{
          			fontWeight: "medium",
      			  }}>
     
   
        <TouchableOpacity >
          <View style={styles.normal}>
            <Text style={styles.text}>Customer Deliveries </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.normal}>
            <Text style={styles.text}>Customer Pickups</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.normal}>
            <Text style={styles.text}>Seller Deliveries </Text>
          </View>
        </TouchableOpacity>
     
          <TouchableOpacity >
          <View style={styles.normal}>
            <Text style={styles.text}>Seller Pickups</Text>
          </View>
        </TouchableOpacity>
       

        <Container style={styles.containter}>
      


            <TouchableOpacity onPress={() => navigation.navigate('barcode')}>

              <View style={styles.bt1}>
                
                <Text style={styles.text1}>Sync</Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity >
              <View style={styles.bt2}>
                <Text style={styles.text1}>Language</Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity >
              <View style={styles.bt3}>
                <Text style={styles.text1}>Log Out</Text>
              </View>

            </TouchableOpacity>

        </Container>
        </Box>
               
      	</Box>
    </NativeBaseProvider>
  );
};

export default Main;

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

  text: {
    alignSelf: 'center',
    // paddingLeft: 30,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18

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