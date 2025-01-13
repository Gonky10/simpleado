import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Configuration, OpenAIApi } from 'openai';

const ResumeTxt = () => {
  const [fileContent, setFileContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  // Configura la API de OpenAI
  const generateSummary = async () => {
    if (!fileContent) {
      alert('Primero selecciona un archivo.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer TU_API_KEY_DE_OPENAI`, // Reemplaza con tu clave de OpenAI
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Por favor, resume el siguiente texto:\n\n${fileContent}`,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setSummary(data.choices[0].text.trim());
      } else {
        alert('No se pudo generar el resumen. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al generar el resumen:', error);
      alert('Ocurrió un error al generar el resumen.');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para seleccionar un archivo
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.pdf],
      });

      // Lee el contenido del archivo (para .txt, no .pdf)
      if (res.type === 'text/plain') {
        const content = await RNFS.readFile(res.uri, 'utf8');
        setFileContent(content); // Mostrar contenido del archivo
      } else {
        alert('Solo se leerán archivos .txt. Se seleccionó un archivo PDF.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Selección cancelada');
      } else {
        console.error(err);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Archivos</Text>
      <TouchableOpacity style={styles.button} onPress={selectFile}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>

      {fileContent ? (
        <>
          <Text style={styles.sectionTitle}>Contenido del Archivo:</Text>
          <Text style={styles.fileContent}>{fileContent}</Text>

          <TouchableOpacity style={styles.button} onPress={generateSummary}>
            <Text style={styles.buttonText}>Generar Resumen</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
          ) : (
            summary && (
              <>
                <Text style={styles.sectionTitle}>Resumen Generado:</Text>
                <Text style={styles.summary}>{summary}</Text>
              </>
            )
          )}
        </>
      ) : (
        <Text style={styles.placeholder}>El contenido del archivo aparecerá aquí.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileContent: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summary: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  placeholder: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
});

export default ResumeTxt;
