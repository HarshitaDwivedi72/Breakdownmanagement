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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
          <Stack.Navigator>
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









