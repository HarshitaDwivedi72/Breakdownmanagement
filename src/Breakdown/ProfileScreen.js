import * as React from 'react';

import {View,StyleSheet,Text} from 'react-native';

const ProfileScreen=({navigation})=>{

    console.log(navigation);

return(
          <View  style={styles.container} >
              <Text style={styles.aboutText}> You have reached inside About                Page</Text>
         </View>
 )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    aboutText: {
         margin: 20,
         color:'black',
           textAlign: 'center',
           fontWeight: 'bold',
          fontSize: 20
    }

})
export default ProfileScreen