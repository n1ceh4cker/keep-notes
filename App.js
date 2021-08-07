import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Provider as PaperProvider, configureFonts, DefaultTheme } from 'react-native-paper';
import { fontConfig } from './config/font';
import * as Font from 'expo-font';
import Navigation from './components/Navigation';
import NoteContextProvider from './context/NoteContext';

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig)
  }
export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }
  
  return (
    <NoteContextProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <StatusBar backgroundColor='#00000000' barStyle='dark-content'/>
      </PaperProvider>
    </NoteContextProvider>
  );
}