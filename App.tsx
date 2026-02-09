import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import {ThemeProvider, useTheme} from './src/contexts/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function AppContent() {
  const {colors, isDark} = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Routes />
    </>
  );
}

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <NavigationContainer>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
