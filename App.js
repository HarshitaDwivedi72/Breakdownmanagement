import React from 'react';

import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/Main';


const Stack = createStackNavigator();

function App() {
  return (

    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator>

           <Stack.Screen name="Main" component={Main}
            options={{
              header: () => null
            }} />
 
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>



  );
}


export default App;

