import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Appearance, StatusBar } from 'react-native';
import { Provider as PaperProvider, configureFonts, DefaultTheme, DarkTheme } from 'react-native-paper';
import { fontConfig } from './config/font';
import * as Font from 'expo-font';
import Navigation from './components/Navigation';
import NoteContextProvider from './context/NoteContext';

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#fff"
    },
    fonts: configureFonts(fontConfig)
  }
const darkTheme = {
    ...DarkTheme,
    fonts: configureFonts(fontConfig)
  }
export default function App() {
  const colorScheme = Appearance.getColorScheme()
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
      <PaperProvider theme={ colorScheme == 'dark' ? darkTheme: lightTheme }>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <StatusBar
          backgroundColor={colorScheme == 'dark' ? '#121212' : '#fff'}
          barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'}
          />
      </PaperProvider>
    </NoteContextProvider>
  );
}