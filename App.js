import * as React from 'react';
import './ignoreWarnings'
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
import OTP from './src/dsqc/OTP';
import Camera from './src/dsqc/Camera';
import QCreason from './src/dsqc/QCreason';
import Barcode from './src/dsqc/Barcode';
import DocumentDetailDriver from './src/dsqc/DocumentDetailDriver';
import NewCamera from './src/dsqc/NewCamera';
import NewBarcode from './src/dsqc/NewBarcode';
import MasterManifest from './src/dsqc/MasterManifest';
import TransportManifest from './src/dsqc/TransportManifest';
import RunSheet from './src/dsqc/RunSheet';
import CustomerPickup from './src/dsqc/CustomerPickup';
import MapScreen from './src/dsqc/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
          <Stack.Navigator>

        
          <Stack.Screen name="CustomerPickup" component={CustomerPickup} 
          options={{ title: 'Welcome' }}
          />
  <Stack.Screen name="Camera" component={Camera} 
          options={{ title: 'Welcome' }}
          />

          <Stack.Screen name="Qcrequired" component={Qcrequired} 
          options={{ title: 'Welcome' }}
          
          />
         <Stack.Screen name="MapScreen" component={MapScreen} 
          options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="DocumentDetailDriver" component={DocumentDetailDriver} 
          options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="RunSheet" component={RunSheet} 
          options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="TransportManifest" component={TransportManifest} 
          options={{ title: 'Welcome' }}
          />

          <Stack.Screen name="MasterManifest" component={MasterManifest} 
          options={{ title: 'Welcome' }}
          />

        
          <Stack.Screen name="OTP" component={OTP} 
              options={{ title: 'Welcome' }}
          />

            
          <Stack.Screen name="Barcode" component={Barcode} 
          options={{ title: 'Welcome' }}
          />


          <Stack.Screen name="NewBarcode" component={NewBarcode} 
          options={{ title: 'Welcome' }}
          />

         

          <Stack.Screen name="NewCamera" component={NewCamera} 
          options={{ title: 'Welcome' }}
          />

          

          <Stack.Screen name="QCreason" component={QCreason} 
          options={{ title: 'Welcome' }}
          />

          <Stack.Screen name="ProductName" component={ProductName} 
          options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="PickupfailReason" component={PickupfailReason} 
          options={{ title: 'Welcome' }}
          
          />
          <Stack.Screen name="Qcnotrequired" component={Qcnotrequired} 
          options={{ title: 'Welcome' }}
          
          />
        
          <Stack.Screen name="MainScreen" component={MainScreen} 
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
            
           <Stack.Screen name="BreakdownManagementDriver" component={BreakdownManagementDriver} 
           options={{ title: 'Welcome' }}
           
           />
          </Stack.Navigator>
      </NavigationContainer>
  );
}









