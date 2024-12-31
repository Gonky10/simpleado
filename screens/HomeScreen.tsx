import React, { useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet,  Dimensions, Image, ActivityIndicator,ScrollView, TextInput, Modal} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { WebView } from 'react-native-webview';
import { ColorPicker } from 'react-native-color-picker';
import FileViewer from 'react-native-file-viewer';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
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
  const [headerColor, setHeaderColor] = useState('black');
  const [footerColor, setFooterColor] = useState('black');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [currentColorTarget, setCurrentColorTarget] = useState(''); // 'header' | 'footer'
  const [imageURI, setImageURI] = useState('');
  const [activityIndicator, setActivityIndicator] = useState(false); // Estado para el HTML final
  const [htmlContent, setHtmlContent] = useState(''); // Estado para el HTML final



useEffect(() => {
  const updateHTML = async () => {
    let base64Image = '';
    if (imageURI) {
      base64Image = await RNFS.readFile(imageURI, 'base64');
    }

    const generatedHTML = `
    <html>
  <head>
    <style>
      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }

      /* Estilos generales */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        text-align: center;
        flex: 1;
        background-color: #f7f7f7;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      /* Header */
      .header {
        width: 100%;
        height: ${headerHeight || 10}%;
        font-size: 30px;
        font-weight: bold;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, ${headerColor || 'black'}, ${headerColor || '#388E3C'});
        margin-bottom: 1%;
      }

      /* Footer */
      .footer {
        width: 100%;
        height: ${footerHeight || 8}%;
        font-size: 30px;
        font-weight: bold;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, ${headerColor || 'black'}, ${headerColor || '#388E3C'});
        margin-top: 1%;
      }


      .image-container img {
              width: 50%;
              height: auto;
              margin-top: 4%;
              border-radius: 30px
            }
      /* Contenedor principal */
      .content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .card {
        width: 60%;
        max-width: 600px;
        padding: 5%;
        background-color: #ffffff;
        box-shadow: 0 2% 4% rgba(0,0,0,0.1);
        border-radius: 2%;
        text-align: center;
        margin: auto;
      }

      .title {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 2%;
        color: #333;
      }

      .details {
        font-size: 40px;
        margin: 1% 0;
        color: #555;
      }
    </style>
  </head>
  <body>
    <!-- Header -->
    <div class="header">
    Invitacion especial
    </div>
    
    <!-- Contenido Principal -->
    <div class="content">
      <div class="card">
        <div class="title">${recipientName || '(Título)'}</div>
        <div class="details">📅 Fecha: <strong>${eventDate || '(Fecha)'}</strong></div>
        <div class="details">⏰ Hora: <strong>${eventTime || '(Hora)'}</strong></div>
        <div class="details">📍 Lugar: <strong>${eventLocation || '(Ubicación)'}</strong></div>
        ${
          base64Image
            ? `<div class="image-container">
                <img src="data:image/jpeg;base64,${base64Image}" alt="Imagen Seleccionada"/>
              </div>`
            : ''
        }
        </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      Organizado por: ${organizerName || '(Organizador)'}
    </div>
  </body>
</html>
  `;


    setHtmlContent(generatedHTML); // Guardar HTML en el estado
  };

  updateHTML();
}, [recipientName, headerColor,  eventDate, eventTime, eventLocation, organizerName, imageURI, headerHeight, footerHeight]);
  
const selectImage = () => {
  launchImageLibrary({ mediaType: 'photo' }, (response) => {
    if (response.didCancel) {
      alert('Cancelado', 'El usuario canceló la selección de imagen');
    } else if (response.errorMessage) {
      alert('Error', response.errorMessage);
    } else {
      const source = response.assets[0].uri;
      setImageURI(source);
    }
  });
};

// Tomar Foto con la Cámara
const takePhoto = () => {
  launchCamera({ mediaType: 'photo' }, (response) => {
    if (response.didCancel) {
      alert('Cancelado', 'El usuario canceló la captura de foto');
    } else if (response.errorMessage) {
      alert('Error', response.errorMessage);
    } else {
      console.log();
      
      const source = response.assets[0].uri;
      setImageURI(source);
    }
  });
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
      setActivityIndicator(true)
      setTimeout(() => {
        setActivityIndicator(false)
      }, 3000);
      const options = {
        html: htmlContent,
        fileName: 'Flyer_Cumpleaños',
        directory: 'Documents',
        base64: true,
      };
      
      console.log("filefilefile: ", options);

      try {
        const file = await RNHTMLtoPDF.convert(options);
        
        // Intenta abrir el archivo PDF automáticamente
        await FileViewer.open(file.filePath, {type: 'application/pdf' });
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
              source={{ html: htmlContent }}
              style={styles.webview}
            />
          </View>
    <ScrollView style={styles.container}>
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
    <Text style={styles.label}>Altura del Header (%):</Text>
    <TextInput style={styles.input} value={headerHeight} onChangeText={setHeaderHeight} keyboardType="numeric" />
      <Text style={styles.label}>Color del Header y footer:</Text>
      <TouchableOpacity onPress={() => openColorPicker('header')} style={styles.colorButton}>
        <Text style={{ color: headerColor }}>Seleccionar color del Header</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Altura del Footer (vh):</Text>
      <TextInput style={styles.input} value={footerHeight} onChangeText={setFooterHeight} keyboardType="numeric" />
          <View style={styles.botonesFotos}>
          <Text style={styles.label}>Añadir imagenes:</Text>
            <Button title="Seleccionar Imagen" onPress={selectImage} />
            <Button title="Tomar Foto" onPress={takePhoto} />
            {imageURI ? <Image source={{ uri: imageURI }} style={styles.imagePreview} /> : null}
          </View>


          <TouchableOpacity  style={
            styles.onpress
          } onPress={onGeneratePDF} >
            {activityIndicator == true ?
            <>
            <ActivityIndicator
                  size="large"
                  color="#FEFEFE"
                />
            </>:
            <>
            <Text  style={
            styles.onpressText
          }>Guardar</Text>
            </>}
            
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
    fontSize:height * 0.013,
    fontWeight:'bold'
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  botonesFotos: {
    marginTop: height * 0.02,
    alignItems :'flex-start',
    justifyContent: 'center'
  }
});


export default HomeScreen;
