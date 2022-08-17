import React from 'react';
import 'react-native-gesture-handler';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/Main';
import CustomerDeliveries from './src/CustomerDeliveries';
import CustomerPickups from './src/CustomerPickups';
import SellerDeliveries  from './src/SellerDeliveries';
import SellerPickups from './src/SellerPickups';

const Stack = createStackNavigator();

function App() {
  return (

    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>

          <Stack.Screen name="LoginScreen" component={LoginScreen}
            options={{
              header: () => null
            }} /> 
           <Stack.Screen name="Main" component={Main}
            options={{
              header: () => null
            }} />
          <Stack.Screen name="CustomerDeliveries" component={CustomerDeliveries}
            options={{
              header: () => null
            }} />

          <Stack.Screen name="CustomerPickups" component={CustomerPickups} 
          options={{
            header: () => null
            }} />

          <Stack.Screen name="SellerDeliveries" component={SellerDeliveries} 
           options={{
            header: () => null
            }}/>

          <Stack.Screen name="SellerPickups" component={SellerPickups} 
           options={{
            header: () => null
           }} />

        
         
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>



  );
}


export default App;

