import * as React from 'react';
import { Button,StyleSheet, View, Alert, Text } from 'react-native';
const HomeScreen = ({ navigation }) => {

    console.log(navigation);

   return (
       <View  style={styles.container} >
        <View style={styles.buttonContainer}>
        <Button color="#009933"   title="Go To About Page"
         onPress={() => navigation.navigate('ProfileScreen', { name: 'ProfileScreen' })}/>
       </View>
        </View>
   );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    }

})
export default HomeScreen;