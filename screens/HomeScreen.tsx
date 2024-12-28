import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,  Dimensions, Image, ScrollView, TextInput, Modal} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { WebView } from 'react-native-webview';
import { ColorPicker } from 'react-native-color-picker';
import FileViewer from 'react-native-file-viewer';

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};
let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
const height = Dimensions.get('window').height * scale;
const width = Dimensions.get('window').width * scale;
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
const [recipientName, setRecipientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [headerHeight, setHeaderHeight] = useState('5'); // vh
  const [footerHeight, setFooterHeight] = useState('5'); // vh
  const [headerColor, setHeaderColor] = useState('#4CAF50');
  const [footerColor, setFooterColor] = useState('#4CAF50');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [currentColorTarget, setCurrentColorTarget] = useState(''); // 'header' | 'footer'
  // const generateHTML = () => {
  //   return `
  //     <html>
  //       <head>
  //         <style>
  //           @page {
  //             size: A4;
  //             margin: 0;
  //           }
  //           body {
  //             font-family: Arial, sans-serif;
  //             margin: 0;
  //             padding: 0;
  //             height: 100vh;
  //             display: flex;
  //             flex-direction: column;
  //             justify-content: center;
  //             align-items: center;
  //             text-align: center;
  //             background-color: #f7f7f7;
  //           }

  //           .header, .footer {
  //             width: 100%;
  //             text-align: center;
  //             font-weight: bold;
  //             position: fixed;
  //             left: 0;
              
  //           }

  //           .header {
  //             top: 0;
  //             height: ${headerHeight}vh;
  //             line-height: ${headerHeight}vh;
  //             background-color: ${headerColor};
  //             color: white;
  //             font-size: 5vh;
  //           }

  //           .footer {
  //             bottom: 0;
  //             height: ${footerHeight}vh;
  //             line-height: ${footerHeight}vh;
  //             background-color: ${headerColor};
  //             color: white;
  //             font-size: 6vh;
  //           }

  //           .content {
  //             flex: 1;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             width: 100%;
  //             margin-top: calc(${headerHeight}vh + 1vh);
  //             margin-bottom: calc(${footerHeight}vh + 1vh);
  //           }

  //           .card {
  //             width: 80%;
  //             height: 60%;
  //             padding: 5%;
  //             background-color: #ffffff;
  //             box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  //             border-radius: 10px;
  //             display: flex;
  //             flex-direction: column;
  //             justify-content: center;
  //             align-items: center;
  //           }

  //           .title {
  //             font-size: 8vh;
  //             font-weight: bold;
  //             margin-bottom: 2vh;
  //             color: #333;
  //           }

  //           .details {
  //             font-size: 6vh;
  //             margin: 1vh 0;
  //             color: #555;
  //           }

  //           .footer-text {
  //             font-size: 2vh;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="header">🎉 Invitación Especial 🎉</div>
  //         <div class="content">
  //           <div class="card">
  //             <div class="title">${ recipientName || '(Titulo)'}</div>
  //             <div class="details">📅 Fecha: <strong>${eventDate || '(Fecha)'}</strong></div>
  //             <div class="details">⏰ Hora: <strong>${eventTime || '(Hora)'}</strong></div>
  //             <div class="details">📍 Lugar: <strong>${eventLocation || '(Ubicación)'}</strong></div>
  //           </div>
  //         </div>
  //         <div class="footer">${organizerName || '(Organizador)'}</div>
  //       </body>
  //     </html>
  //   `;
  // };

  // const generateHTML = () => {
  //   return `
  //     <html>
  //       <head>
  //         <style>
  //           @page {
  //             size: A4;
  //             margin: 0;
  //           }
  
  //           /* Estilos generales */
  //           body {
  //             font-family: Arial, sans-serif;
  //             margin: 0;
  //             padding: 0;
  //             text-align: center;
  //             background-color: #f7f7f7;
  //           }
  
  //           /* Contenedor Principal */
  //           .container {
  //             width: 100%;
  //             display: flex;
  //             flex-direction: column;
  //             justify-content: space-between;
  //             align-items: center;
  //           }
  
  //           /* Header */
  //           .header {
  //             width: 100%;
  //             height: 80px;
  //             font-size: 24px;
  //             font-weight: bold;
  //             color: white;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             margin-bottom: 20px;
  //             background: linear-gradient(90deg, ${headerColor || '#4CAF50'}, ${headerColor || '#388E3C'});
  //           }
  
  //           /* Contenido Principal */
  //           .content {
  //             width: 90%;
  //             flex: 1;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             margin: 20px 0;
  //           }
  
  //           .card {
  //             width: 100%;
  //             padding: 20px;
  //             background-color: #ffffff;
  //             box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  //             border-radius: 10px;
  //             text-align: center;
  //           }
  
  //           .title {
  //             font-size: 28px;
  //             font-weight: bold;
  //             margin-bottom: 10px;
  //             color: #333;
  //           }
  
  //           .details {
  //             font-size: 18px;
  //             margin: 5px 0;
  //             color: #555;
  //           }
  
  //           /* Footer */
  //           .footer {
  //             width: 100%;
  //             height: 60px;
  //             font-size: 16px;
  //             color: white;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             margin-top: 20px;
  //             background: linear-gradient(90deg, ${footerColor || '#4CAF50'}, ${footerColor || '#388E3C'});
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="container">
  //           <!-- Header -->
  //           <div class="header">
  //             🎉 Invitación Especial 🎉
  //           </div>
            
  //           <!-- Contenido Principal -->
  //           <div class="content">
  //             <div class="card">
  //               <div class="title">${recipientName || '(Título)'}</div>
  //               <div class="details">📅 Fecha: <strong>${eventDate || '(Fecha)'}</strong></div>
  //               <div class="details">⏰ Hora: <strong>${eventTime || '(Hora)'}</strong></div>
  //               <div class="details">📍 Lugar: <strong>${eventLocation || '(Ubicación)'}</strong></div>
  //             </div>
  //           </div>
            
  //           <!-- Footer -->
  //           <div class="footer">
  //             Organizado por: ${organizerName || '(Organizador)'}
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //   `;
  // };
  
  const generateHTML = () => {
    return `
      <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
  
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              text-align: center;
              background-color: black;
            }
  
            /* Contenedor General */
            .wrapper {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
  
            /* Header */
            .header-container {
              width: 100%;
              height: 80px;
              background-color: ${headerColor || '#4CAF50'};
              display: flex;
              align-items: center;
              justify-content: center;
            }
  
            .header {
              font-size: 24px;
              font-weight: bold;
              color: white;
            }
  
            /* Contenido */
            .content {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 20px;
            }
  
            .card {
              width: 80%;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              border-radius: 10px;
              text-align: center;
            }
  
            .title {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #333;
            }
  
            .details {
              font-size: 18px;
              margin: 5px 0;
              color: #555;
            }
  
            /* Footer */
            .footer-container {
              width: 100%;
              height: 60px;
              background-color: ${footerColor || '#4CAF50'};
              display: flex;
              align-items: center;
              justify-content: center;
            }
  
            .footer {
              font-size: 16px;
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <!-- Header -->
            <div class="header-container">
              <div class="header">🎉 Invitación Especial 🎉</div>
            </div>
  
            <!-- Contenido -->
            <div class="content">
              <div class="card">
                <div class="title">${recipientName || '(Título)'}</div>
                <div class="details">📅 Fecha: <strong>${eventDate || '(Fecha)'}</strong></div>
                <div class="details">⏰ Hora: <strong>${eventTime || '(Hora)'}</strong></div>
                <div class="details">📍 Lugar: <strong>${eventLocation || '(Ubicación)'}</strong></div>
              </div>
            </div>
  
            <!-- Footer -->
            <div class="footer-container">
              <div class="footer">Organizado por: ${organizerName || '(Organizador)'}</div>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  
  
  
  

  const applyColor = (color) => {
    if (currentColorTarget === 'header') {
      setHeaderColor(color);
    } else if (currentColorTarget === 'footer') {
      setFooterColor(color);
    }
    setIsColorPickerVisible(false);
  };

  const openColorPicker = (target) => {
    setCurrentColorTarget(target);
    setIsColorPickerVisible(true);
  };
    
    
  
    /**
     * Generar el PDF a partir del HTML dinámico
     */
    const onGeneratePDF = async () => {
      const options = {
        html: generateHTML(),
        fileName: 'Flyer_Cumpleaños',
        directory: 'Documents',
        base64: true,
        height:792,
        width: 612
      };
      console.log("filefilefile: ", options);

      try {
        const file = await RNHTMLtoPDF.convert(options);
        
        // Intenta abrir el archivo PDF automáticamente
        await FileViewer.open(file.filePath, { showOpenWithDialog: true, type: 'application/pdf' });
      } catch (err) {
        console.error('Error al generar o abrir el PDF:', err);
    
        if (err.message.includes('No app associated with this mime type')) {
          alert('No se encontró una aplicación para abrir archivos PDF. Instala un visor de PDF.');
        } else {
          alert('Hubo un error al generar o abrir el archivo PDF.');
        }
      }
    };
  return (
    <View style={{
          flex: 1,
          padding: 20,
          backgroundColor: '#fff',
        }}>
                    <Text style={styles.title}>Generador de Flyers</Text>

          <View style={styles.previewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ html: generateHTML() }}
              style={styles.webview}
            />
          </View>
    <ScrollView style={styles.container}>
    <Text style={styles.label}>Altura del Header (vh):</Text>
    <TextInput style={styles.input} value={headerHeight} onChangeText={setHeaderHeight} keyboardType="numeric" />
      <Text style={styles.description}>
        🛈 Un `vh` equivale al 1% de la altura de la pantalla. Por ejemplo:
        - 10vh ≈ 10% de la altura total.
      </Text>
      <Text style={styles.label}>Color del Header y footer:</Text>
      <TouchableOpacity onPress={() => openColorPicker('header')} style={styles.colorButton}>
        <Text style={{ color: headerColor }}>Seleccionar color del Header</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Altura del Footer (vh):</Text>
      <TextInput style={styles.input} value={footerHeight} onChangeText={setFooterHeight} keyboardType="numeric" />
      <Text style={styles.description}>
        🛈 Un `vh` equivale al 1% de la altura de la pantalla. Por ejemplo:
        - 10vh ≈ 10% de la altura total.
      </Text>   
          <Text style={styles.label}>Titulo:</Text>
          <TextInput style={styles.input} value={recipientName} onChangeText={setRecipientName} />
          
          <Text style={styles.label}>Fecha del evento:</Text>
          <TextInput style={styles.input} value={eventDate} onChangeText={setEventDate} />
          
          <Text style={styles.label}>Hora del evento:</Text>
          <TextInput style={styles.input} value={eventTime} onChangeText={setEventTime} />
          
          <Text style={styles.label}>Ubicación del evento:</Text>
          <TextInput style={styles.input} value={eventLocation} onChangeText={setEventLocation} />
          
          <Text style={styles.label}>Nombre del organizador:</Text>
          <TextInput style={styles.input} value={organizerName} onChangeText={setOrganizerName} />
          
          <TouchableOpacity  style={
            styles.onpress
          } onPress={onGeneratePDF} >
            <Text  style={
            styles.onpressText
          }>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal visible={isColorPickerVisible}>
        <ColorPicker onColorSelected={applyColor} style={{ flex: 1 }} />
      </Modal>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: height * 0.03,
    fontWeight: '500',
    marginTop: height * 0.03,
    color: 'black',
    padding:8,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius:5,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: 'black',
    fontSize: height *0.03,
    fontFamily: 'BarlowCondensed-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  colorButton: { padding: 10, marginTop: 5, borderWidth: 1, borderColor: '#ccc' },

  previewContainer: {
    marginTop: 20,
    height: height * 0.3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  description: { fontSize: 14, color: '#555', marginBottom: 5 },

  webview: {
    flex: 1,
  },
  onpress: {
    backgroundColor: 'black',
    borderRadius:5,
    alignSelf: 'center',
alignItems:'center',
justifyContent: 'center',
height: height *0.06,
margin:30,
width: width *0.3,
  },
  onpressText: {
    color: 'white',
    fontSize:10
  }
});

export default HomeScreen;
