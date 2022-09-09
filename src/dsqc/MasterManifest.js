
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import { Alert } from 'react-native';


const MasterManifest = () => {

  const [order, setOrder] = useState();

  const datadekho = async() => {
    await fetch("https://bked.logistiex.com/LMPdfgeneration/MasterManifestGeneration/TI12DC")
    .then((response) => response.json()) 
    .then((json) => {
      setOrder(json);
    })
    .catch((error) => alert(error)) 
  }


  let contactList = [];
  let html = ``
  if(order){
    order[0].manifestData.map(contact => {
       html = `
       <tr>
       <td colspan="2">
           <table style="border-bottom: 1px solid gray; width: 100%; height: 80px">
               <tr>
                   <td style="text-align: center; font-size: 22px; font-weight: bold; color: navy;width: 10%; border-right: 1px solid gray;">
                   1
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.BagSealId}
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.BagSealId}
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.NoOfPieces}
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.OrderWeight}
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.Amount}
                   </td>
                   <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%;border-right: 1px solid gray;">
                   ${contact.BagManifestNo}
                   </td>
               </tr>
           </table>
       </td>
   </tr>
      `
      
    })
    
  }

  console.log(contactList.length);
  contactList.push(html);
  // for(var i=0; i<20; i++){
  //   contactList.push(html);
  // }
  if(order){
    
  var htmlContent = `
  <!DOCTYPE html>
<html>
<head>
    <title>Repeat HTML Table Header and Footer in PDF Pages</title>
</head>
<body style="margin: 0px; font-family: 'Times New Roman'; font-size: 14px">
    <table style="width: 1024px; font-family: 'Times New Roman'; font-size: 16px">
        <!-- The automaticaly repeated table header -->
        <!-- To disable the repeating of the header add style="display: table-row-group" to thead -->
        <thead>
            <tr>
                <td colspan="2">
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 200px">
                                <img alt="Logo Image" style="float: left; width: 200px" src="img/logo.jpg" />
                            </td>
                            <td style="text-align: right; font-size: 22px; font-weight: bold; color: navy">Master Manifest
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <br />
            <tr>
                <td colspan="2">
                    <table style=" width: 100%; height: 50px">
                        <tr>
                            <td style="width: 200px">
                            <img 
          height="50px"
          width="250px"           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS8AAACmCAMAAAC8yPlOAAAAb1BMVEX///8AAABMTEyrq6s3Nzf7+/v39/fw8PCLi4vIyMidnZ0oKCgWFhbm5ubb29vu7u6WlpbV1dWAgIBxcXGlpaUxMTE+Pj55eXm7u7tbW1tsbGyHh4e1tbXQ0NCRkZFgYGAZGRkYGBggICAODg5UVFSifG7eAAAC7klEQVR4nO3Ry3riMAyGYRlwwqEEGkI4TYEC93+NlWU7AcozXczMar5/QaLYieQXEfJHKauqEqkWeltUPj2sYrwsqlQUuqqZp62iK3dFV5b2mXBr8fqermk5n3/fWFb5eepntwsrwyTdO0WVp7Xv3Y38NEncGN6zkWO09F2DebiUdpi7o8aDzisb6/dpnLt6uRz09sPlAS/OspCjE7HbiWzDZaDl0rYcnZt1hcjBuZN41+jt1lbiqO5df2st15v0qHaulcI2/nJeVmFrEdu5sD6rrQyT7Nv0zodLNqXb6u9URxa5jtPq0rlbmmTiwoFvOxt6ktbbvc6RG7Th0thhzMbb80oOF1trfvQa6um8rEPz985rnb2W2uItek3CJUwyzVOORD6n6Q3l2/deowevg5Zt3cMOVGRoXiKb0ZPXaNx5rQavvRr7Q2bHtDoNf5Vcp53X7vTgNVhlrzctwnXYe0nyGq9tbfiPvc544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YUXXnjhhRdeeOGFF1544YXXN6/P/85Lmzsv54ONlb3O2evo0hcn1kKPKm6ZgS5dYQyn3uvy4FXr6dab9Kh2rlWRxry8rGZPXpe689q3r70U6KpA47Sq/9wtTRK9brsHr3afvbRBGy5N7+WT1+Fsa82PXr4sCp24sHHyw8JShtVYlN42lrpNb/v3UhHKbi2upAPGr+UGobjf2DXO/eKDsr+9+4zd9A2Kl637ft1o8YuW0D4fJn2zjI2f3iGEEEIIIYQQQgghhBBCCCGEkL+eL+2Cc7nmhLG3AAAAAElFTkSuQmCC" alt="no image found"  />
                            </td>
                            <td style="text-align: right; font-size: 22px; font-weight: bold; color: navy">Date and Time :-
                            </td>
                            <td style="text-align: right; font-size: 22px; font-weight: bold; color: navy">12/45/2001
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
            <td colspan="2">
                <table style=" width: 100%; height: 100px">
                    <tr>
                        <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 30%">
                        No :- VH/DEL/2122/009808 Document number (Dynamic Value)
                        </td>
                        <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 70%">
                        RDC-DELHI PRIMO INTEGRATED SERVICES PLOT NO 72/1 & 73 BAMNOLI VILLAGE, SECTOR 28 DWARKA, NEW DELHI-110075
                        RDC-JAIPUR PLOT NO. 173,174. NARAYAN VIHAR G-BLOCK, NEAR BUNIYAAD SCHOOL SANGANER JAIPUR-302020
                        </td>
                       
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
        <td colspan="2">
            <table style=" width: 100%; height: 50px">
                <tr>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 35%">
                    ${order[0].originLocation}
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 35%">
                    TO
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 30%">
                    ${order[0].originLocationAddress}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <table style="border-bottom: 1px solid gray; width: 100%; height: 20px">
                <tr>
                    <td style="text-align: center; font-size: 22px; font-weight: bold; color: navy;width: 10%; border-right: 1px solid gray;">
                    S.NO
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    Seal Number
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    No. of Cnotes
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    No. of pkgs
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    Weight
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    Amount
                    </td>
                    <td style="text-align: left; font-size: 22px; font-weight: bold; color: navy;width: 15%">
                    Manifest No.
                    </td>
                </tr>
            </table>
        </td>
    </tr>
        </thead>
       
        ${contactList.join('')}

        <!-- The automaticaly repeated table footer -->
        <!-- To disable the repeating of the footer add style="display: table-row-group" to tfoot -->
        <tfoot>
            <tr>
                <td colspan="2">
                    <table style="border-top: 1px solid gray; width: 100%;">
                        <tr>
                            <td style="font-size: 22px; font-weight: bold; color: green">Vehical NUmber :- ${order[1].VehicleNumber}
                            </td>
                            <td style="font-size: 22px; font-weight: bold; color: green">Driver Name :- ${order[1].DriverName}
                            </td>
                        </tr>
                        <tr>
                        <td style="font-size: 22px; font-weight: bold; color: green">Receiver Name :- 
                        </td>
                        <td style="font-size: 22px; font-weight: bold; color: green">Dispatch Time :- ${order[1].DispatchTime}
                        </td>
                    </tr>
                    <tr>
                    <td style="font-size: 22px; font-weight: bold; color: green">Vehical Seal No :- ${order[1].VehicleSealNumber}
                    </td>
                    <td style="font-size: 22px; font-weight: bold; color: green">Phone :- ${order[1].DriverMobileNo}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 22px; font-weight: bold; color: green">Receiver Signature :- 
                    </td>
                    
                </tr>
                    </table>
                </td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
`
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
          datadekho(); 
          if(order){
            createPDF();
          }
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
      datadekho(); 
      if(order){
        createPDF();
      }
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
    Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });

  }

  const openFile = (filepath) => {
    const path = filepath;
    FileViewer.open(path)
      .then(() => {
      })
      .catch(error => {
        
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

export default MasterManifest;

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
























































{/* <body>

<table class="report-container">
<thead class="report-header">
  <tr>
    <th class="report-header-cell">
      <div class="header-info">
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
      </div>
    </th>
  </tr>
</thead>
<tfoot class="report-footer">
  <tr>
    <td class="report-footer-cell">
      <div class="footer-info">
        footer
      </div>
    </td>
  </tr>
</tfoot>
<tbody class="report-content">
  <tr>
    <td class="report-content-cell">
      <div class="main">
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
      </div>
    </td>
  </tr>
</tbody>
</table>

    
  
</body> */}