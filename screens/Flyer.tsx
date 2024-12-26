import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { WebView } from 'react-native-webview';
let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
const height = Dimensions.get('window').height * scale;
const width = Dimensions.get('window').width * scale;
const FlyerForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [organizerName, setOrganizerName] = useState('');

  /**
   * Generar el HTML dinámico en función de los valores ingresados
   */
  
  const generateHTML = () => {
    return `
      <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
  
            /* Estilo general del cuerpo */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              background-color: #f7f7f7;
            }
  
            /* Header y Footer */
            .header, .footer {
              width: 100%;
              text-align: center;
              padding: 1vh 0;
              background-color: #4CAF50;
              color: white;
              font-weight: bold;
              position: fixed;
              left: 0;
            }
  
            .header {
              top: 0;
            }
  
            .footer {
              bottom: 0;
            }
  
            /* Contenedor principal */
            .content {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              margin-top: 10vh; /* Espacio debajo del header */
              margin-bottom: 10vh; /* Espacio encima del footer */
            }
  
            /* Tarjeta centrada */
            .card {
              width: 80%;
              height: 90%;
              padding: 5%;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              border-radius: 10px;
               display: flex;
              flex-direction: column;
              justify-content: center; /* Centra verticalmente */
              align-items: center;
              
            }
  
            /* Texto con tamaño proporcional */
            .title {
              font-size: 5vh; /* 5% de la altura de la pantalla */
              font-weight: bold;
              margin-bottom: 2vh;
              color: #333;
            }
  
            .details {
              font-size: 5vh; /* 2.5% de la altura de la pantalla */
              margin: 1vh 0;
              color: #555;
            }
  
            .footer-text {
              font-size: 2vh; /* 2% de la altura de la pantalla */
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            🎉 Invitación Especial 🎉
          </div>
          
          <!-- Contenido principal -->
          <div class="content">
            <div class="card">
              <div class="title">¡Feliz Cumpleaños, ${recipientName || 'Nombre Destinatario'}!</div>
              <div class="details">📅 Fecha: <strong>${eventDate || 'Fecha'}</strong></div>
              <div class="details">⏰ Hora: <strong>${eventTime || 'Hora'}</strong></div>
              <div class="details">📍 Lugar: <strong>${eventLocation || 'Ubicación'}</strong></div>
              <div class="details">📝 Organizado por: <strong>${organizerName || 'Nombre del Organizador'}</strong></div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-text">Gracias por acompañarnos en este día tan especial ❤️</div>
          </div>
        </body>
      </html>
    `;
  };
  
  

  /**
   * Generar el PDF a partir del HTML dinámico
   */
  const onGeneratePDF = async () => {
    const options = {
      html: generateHTML(),
      fileName: 'Flyer_Cumpleaños',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      alert(`Archivo PDF guardado en: ${file.filePath}`);
    } catch (err) {
      console.error('Error al generar el PDF:', err);
      alert('Error al generar el PDF');
    }
  };

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    }}>
      <View style={styles.previewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: generateHTML() }}
          style={styles.webview}
        />
      </View>
<ScrollView style={styles.container}>
      <Text style={styles.previewTitle}>Vista previa en tiempo real:</Text>
      
      <Text style={styles.title}>Generador de Flyers</Text>
      <Text style={styles.label}>Nombre del destinatario:</Text>
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
    marginTop: height * 0.06,
    color: 'black',
    padding:8,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius:5,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
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
  previewContainer: {
    marginTop: 20,
    height: height * 0.3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  onpress: {
    padding: 20,
    backgroundColor: 'black',
margin: 20
  },
  onpressText: {
    color: 'white',
    fontSize:10
  }
});

export default FlyerForm;
