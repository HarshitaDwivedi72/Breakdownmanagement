import React, { useEffect, useState } from 'react';
import { Container, ArrowForwardIcon, NativeBaseProvider, Box, Center, Image , VStack, Input, Button,} from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput,getPick, Alert,PermissionsAndroid } from 'react-native';
// import { faBarcode, faQrcode } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

// import { color } from 'styled-system';
// import PickupDashboard  from './PickupDashboard';
// import { Graph } from './Graph';
// import * as RNFS from 'react-native-fs';
// import { parse } from 'react-native-svg';
// import SearchBar, { Searchbar } from './SearchBar';
// import { borderColor } from 'styled-system';



const DocumentDetailDriver = () => {




  const [barcodeValue, setBarcodeValue] = useState("");
  const [otp, setOtp] = useState('');
  const [showline, setLine] = useState(true)
  const navigation = useNavigation();

  const [order, setOrder] = useState();

  const datadekho = async() => {
    await fetch("https://bked.logistiex.com/LMPdfgeneration/MasterManifestGeneration/TI12DC")
    .then((response) => response.json()) 
    .then((json) => {
      setOrder(json);
    })
    .catch((error) => alert(error)) 
  }

  useEffect(() => {
      datadekho();  
      
  }, []);

  let contactList = [];
  if(order){
    order[0].manifestData.map(contact => {
      let html = `
      <tr>
      <th scope="row">1</th>
      <td>${contact.BagSealId}</td>
      <td>${contact.NoOfPieces}</td>
      <td>${contact.ShipmentId}</td>
      <td>${contact.OrderWeight}</td>
      <td>${contact.Amount}</td>
      <td>${contact.BagManifestNo}</td>
    </tr>
      `
      contactList.push(html);
    })
    console.log(contactList);
  }


  if(order){
    
  var htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
  

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  
      <link rel="stylesheet" type="text/css" href="style.css">

      <script type="text/javascript">

      </script>
  
  </head>
  
  <body>

      <section id="bio">
        <div class="container" >
          <div class='row'>
            <div class='col'>
              <h1>LOGO</h1>
            </div>
            <div class='col'>
              <h2>MASTER MANIFEST</h2>
            </div>
            <div class='col'>
              
            </div>
          </div>
          
        </div>
          <br />
          <br />
          <div class="container">
  <div class="row">
    <div class="col">
      <img 
          height="100px"
          width="250px"           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS8AAACmCAMAAAC8yPlOAAAAb1BMVEX///8AAABMTEyrq6s3Nzf7+/v39/fw8PCLi4vIyMidnZ0oKCgWFhbm5ubb29vu7u6WlpbV1dWAgIBxcXGlpaUxMTE+Pj55eXm7u7tbW1tsbGyHh4e1tbXQ0NCRkZFgYGAZGRkYGBggICAODg5UVFSifG7eAAAC7klEQVR4nO3Ry3riMAyGYRlwwqEEGkI4TYEC93+NlWU7AcozXczMar5/QaLYieQXEfJHKauqEqkWeltUPj2sYrwsqlQUuqqZp62iK3dFV5b2mXBr8fqermk5n3/fWFb5eepntwsrwyTdO0WVp7Xv3Y38NEncGN6zkWO09F2DebiUdpi7o8aDzisb6/dpnLt6uRz09sPlAS/OspCjE7HbiWzDZaDl0rYcnZt1hcjBuZN41+jt1lbiqO5df2st15v0qHaulcI2/nJeVmFrEdu5sD6rrQyT7Nv0zodLNqXb6u9URxa5jtPq0rlbmmTiwoFvOxt6ktbbvc6RG7Th0thhzMbb80oOF1trfvQa6um8rEPz985rnb2W2uItek3CJUwyzVOORD6n6Q3l2/deowevg5Zt3cMOVGRoXiKb0ZPXaNx5rQavvRr7Q2bHtDoNf5Vcp53X7vTgNVhlrzctwnXYe0nyGq9tbfiPvc544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YXXN6/P/85Lmzsv54ONlb3O2evo0hcn1kKPKm6ZgS5dYQyn3uvy4FXr6dab9Kh2rlWRxry8rGZPXpe689q3r70U6KpA47Sq/9wtTRK9brsHr3afvbRBGy5N7+WT1+Fsa82PXr4sCp24sHHyw8JShtVYlN42lrpNb/v3UhHKbi2upAPGr+UGobjf2DXO/eKDsr+9+4zd9A2Kl637ft1o8YuW0D4fJn2zjI2f3iGEEEIIIYQQQgghhBBCCCGEkL+eL+2Cc7nmhLG3AAAAAElFTkSuQmCC" alt="no image found"  />
    </div>
    <div class="col mt-10"
         >
        Date and Time:-
    </div>
    <div class="col">
      #Value
    </div>
  </div>
</div>
        <div class="conatiner">
          <div class="row">
            <div class="col">
                
            </div>
            <div class="col">
                ${order[0].originLocation}
            </div>
            <div class="col">
                ${order[0].originLocationAddress}
            </div>
          </div>
        </div>
        <br />
        <div class="conatiner">
          <div class="row">
            <div class="col">
                
            </div>
            <div class="col">
                Value of destination <br /> ${order[0].destinationLocation}
            </div>
            <div class="col">
                Value of destination <br /> ${order[0].destinationLocationAddress}
            </div>
          </div>
        </div>
        <br />
        <div class="conatiner">
          <div class="row">
            <div class="col">
                No.
            </div>
            <div class="col">
                ${order[0].documentNumber}
            </div>
            <div class="col">
                
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <div class="conatiner">
          <div class="row">
            <div class="col">
              <h3>Value of origin <br /> location code</h3>
            </div>
            <div class="col">
              <h4>To</h4>
            </div>
            <div class="col">
              <h3>Value of destination <br/> location code</h3>
            </div>
          </div>
        </div>
<!--         <br />
        <br /> -->
        <hr />
        <div class="container">
          <h5  >Manifest Details</h5>
        </div>
      
      </section>
    <div class="container">
          <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">Seal Number</th>
      <th scope="col">No. of Cnotes</th>
      <th scope="col">No. of pkgs</th>
      <th scope="col">Weight</th>
      <th scope="col">Amount</th>
      <th scope="col">Manifest No.</th>
    </tr>
  </thead>
  <tbody id="html-data-table">
    ${contactList.join('')}
    <tr>
      <th scope="row" colspan="1">Vehicle Number:<br />${order[1].VehicleNumber}</th>
      <td colspan="3">Driver Name :${order[1].DriverName}</td>
      <td colspan="3">Dispatch TIme : ${order[1].DispatchTime}</td>
    </tr>
     <tr>
      <th scope="row" colspan="1">Vehicle Seal Number:<br />${order[1].VehicleSealNumber}</th>
      <td colspan="3">Phone Number: ${order[1].DriverMobileNo}</td>
      <td colspan="3">Receiving Time :</td>
    </tr>

     <tr>
      <th scope="row" colspan="1">Receiver Name:</th>
      <td colspan="3">#value</td>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th scope="row" colspan="1">Receiver Signature:</th>
      <td colspan="6"></td>
    </tr>
  </tbody>
</table>
      <br />
      <br />
      <br />
      <br />
    </div>
  </body>
    <style>
      body {
      text-align: center;
      font-family: sans-serif;
  }
  
  #welcome {
      color: #FFFFFF;
      bottom: 0;
      background: linear-gradient(#60ebeb 0%, #27ae60 100%);
      display: table;
      width: 100%;
      height: 100%;
      z-index: 9;
      font-family: sans-serif;
  }
  
  #bio {
      font-family: 'Cinzel Decorative', cursive;
      padding: 50px;
      text-align: center;
      font-family: sans-serif;
  }
  
  h1 {
      font-size: 40px;
      font-family: sans-serif;
      font-weight: 300;
  }
  
  .line {
      height: 6px;
      background-color: #000;
      width: 70px;
      margin: 8px auto;
  }
  
  #contact iframe {
      width: 100%;
  }
  
  .contact_1 h3 {
      display: inline;
  }
  
  .contact_1 a {
      text-shadow: none;
  }
  
  
  #videos iframe {
      width: 80%;
  }
  
  
  input {
      background: grey;
      font-family: sans-serif;
  }
    </style>
  
  </html>
  
  
  
      `;
  }else{
    htmlContent = `
      <h1>No data available</h1>
    `
  }

 


  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message:
              'Pdf creator needs access to Storage data in your SD Card',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  }
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'my-test',
      //File directory
      directory: 'Download',

      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });

  }

  const openFile = (filepath) => {
    const path = filepath;
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  }


  return (
    <NativeBaseProvider>
       <Box flex={1} bg="#004aad" alignItems="center" justifyContent="center">
        		<Box justifyContent="space-between" py={4} px={2}  bg="#fff" rounded="xl" width={350} maxWidth="93%"
        	 	  _text={{
          			fontWeight: "medium",
      			  }}>
     
   
        <TouchableOpacity  >
          <View style={styles.normal}>
            <Text style={styles.text}>Document Details </Text>
          </View>
        </TouchableOpacity>

     

        <View style={styles.mainbox}>
             <View style={styles.smallbox}>
                <Text style={styles.text2}>Tripsheet Print</Text>
                <Button title="Click to View" onPress={askPermission} style={styles.text4} />
              </View>
              {/* <View style={styles.smallbox}>
                <Text style={styles.text2}></Text>
                <Text style={styles.text4}></Text>
              </View> */}
             
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Bag Print</Text>
                <Text style={styles.text4}>Click to View</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>Compilance Document</Text>
                <Text style={styles.text4}>Click to View</Text>
              </View>
            
              {/* <View style={styles.smallbox}>
                <Text style={styles.text2}>Validate Mobile</Text>
                <TouchableOpacity >
          <View style={styles.bt3}>
            <Text style={styles.text}>In Progress </Text>
          </View>
        </TouchableOpacity>
              </View> */}
              {/* <View style={styles.smallbox}>
                <Text style={styles.text2}></Text>
               
              </View> */}

              {/* <View style={styles.smallbox}>
                <Text style={styles.text2}>Input OTP Sent</Text>
                <TextInput style={styles.text1} placeholder=''></TextInput>
              </View> */}
            </View>
        
       
       
   

  
        <Container style={styles.containter}>
      
        <View style={styles.bt2}>
  {/* <FontAwesomeIcon icon={faQrcode } color="black" size={25} style={{marginLeft:8,marginTop:8}} /> */}
  <Text style={styles.text3}>Next</Text>
</View>
         

        </Container>
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

export default DocumentDetailDriver;

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
    width: '95%',
    marginTop:10,
    marginLeft:8,
  },
  normal: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 20,
    paddingTop: 15,
    marginLeft: 0,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
    width: '100%',
    borderRadius: 5
  },
  normal1: {
    fontFamily: 'open sans',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#eee',
    marginTop: 0,
    paddingTop: 15,
    marginLeft: 0,
    marginRight: 10,
    paddingBottom: 15,
    backgroundColor: '#eee',
    width: '100%',
    borderRadius: 5,
    
  },

  text: {
    alignSelf: 'center',
    // paddingLeft: 30,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18

  },
  text11: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18

  },

  bt1: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -64,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 100,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 0


  },
  bt2: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -44,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#004aad',
    width: 120,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 80


  },
  bt3: {
    fontFamily: 'open sans',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 10,
    marginTop: -20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'yellow',
    width: 130,
    borderRadius: 10,
    paddingLeft: 0,
    marginLeft: 170,
    height:40

},  
mainbox:{
  marginTop:10,
  alignItems:'stretch'
},
smallbox:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
padding:5,
marginLeft:5,
  margin:15,
  
  backgroundColor:'white',
 
  },
  text1: {
    fontFamily: 'open sans',
    fontSize: 15,
    lineHeight: 10,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#ADD8E6',
    width: 100,
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: 50,
    width:'45%'
  },

text3: {
  alignSelf: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18
},
text2:{

    color:'#000',
 
   
  },
  text4:{
  
    marginLeft:200,
    marginRight:10,
    color:'#000',
    fontWeight:'normal',
    textAlign: 'center',
    fontSize:15,
    marginTop:-5,
    color:'blue'
   
  },
 

});