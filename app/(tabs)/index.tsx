import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPLEMENTACIÓN DE MANEJO DE SESIONES
const saveSession = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Sesión guardada');
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
  }
};

// Obtener sesión
const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error al obtener la sesión:', error);
  }
};

// Cerrar sesión
const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Sesión eliminada');
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
  }
};

// Uso
const manejarSesion = async () => {
  await saveSession('abc123'); // Guardar token de sesión
  const token = await getSession(); // Recuperar token
  console.log('Token recuperado:', token);
  await removeSession(); // Eliminar sesión
};

manejarSesion();


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

export default function Index() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Valores del formulario:', values); 

            if (values.email === 'evelon@gmail.com' && values.password === 'idgs123') {
              console.log('Acceso correcto, redirigiendo a /explore');
              router.push('/explore'); 
            } else {
              console.log('Usuario o contraseña incorrectos');
              alert('Usuario o contraseña incorrectos');
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
            console.log('handleSubmit:', handleSubmit); 

            return (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TouchableOpacity style={styles.button} onPress={() => {
                  console.log('Botón presionado');
                  handleSubmit(); 
                }}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#123',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#25b2bd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
