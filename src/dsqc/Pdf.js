import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';


const Pdf = () => {

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
    <View style={styles.MainContainer}>
      <TouchableOpacity onPress={askPermission}>
      
        <Text style={styles.text}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Pdf;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
});