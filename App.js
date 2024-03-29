import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BreakdownManagementDriver from './src/BreakdownManagementDriver';
import BreakdownManagementDriver1 from './src/BreakdownManagementDriver1';
import BreakdownManagementDriver2 from './src/BreakdownManagement2';
import BreakdownManagementDriver3 from './src/BreakdownManagementDriver3';
import BreakdownManagementDriver4 from './src/BreakdownManagement4';
import BreakdownManagementDriver5 from './src/BreakdownManagementDriver5';
import GateInOperationDriver from './src/GateInOperationDriver';
import MainScreen from './src/dsqc/MainScreen';
import Qcrequired from './src/dsqc/Qcrequired';
import Qcnotrequired from './src/dsqc/Qcnotrequired';
import PickupfailReason from './src/dsqc/PickupfailReason';
import ProductName from './src/dsqc/ProductName';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen name="ProductName" component={ProductName} 
          options={{ title: 'Welcome' }}
          
          />
          <Stack.Screen name="PickupfailReason" component={PickupfailReason} 
          options={{ title: 'Welcome' }}
          
          />
          <Stack.Screen name="Qcnotrequired" component={Qcnotrequired} 
          options={{ title: 'Welcome' }}
          
          />
          <Stack.Screen name="Qcrequired" component={Qcrequired} 
          options={{ title: 'Welcome' }}
          
          />
          <Stack.Screen name="MainScreen" component={MainScreen} 
            options={{ title: 'Welcome' }}
            
            />

            <Stack.Screen name="BreakdownManagementDriver" component={BreakdownManagementDriver} 
            options={{ title: 'Welcome' }}
            
            />
            <Stack.Screen name="BreakdownManagementDriver1" component={BreakdownManagementDriver1} 
            
            />
            <Stack.Screen name="BreakdownManagementDriver2" component={BreakdownManagementDriver2} 
            
            />
            <Stack.Screen name="BreakdownManagementDriver3" component={BreakdownManagementDriver3} 
            
            />
            <Stack.Screen name="BreakdownManagementDriver4" component={BreakdownManagementDriver4} 
            
            />
            <Stack.Screen name="BreakdownManagementDriver5" component={BreakdownManagementDriver5} 
            
            />
            <Stack.Screen name="GateInOperationDriver" component={GateInOperationDriver} 
            
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
}









