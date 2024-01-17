import React from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {ModalProvider} from './ModalContext';
import {AppProvider} from './AppContext';
import {LaunchPage} from './main_pages/LaunchPage';

console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#694fad',
  },
};

export default function App() {
  const window = useWindowDimensions();

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ModalProvider>
        <AppProvider>
          {Platform.OS === 'android' ? (
            <LaunchPage />
          ) : (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
              <LaunchPage />
            </KeyboardAvoidingView>
          )}
        </AppProvider>
      </ModalProvider>
    </PaperProvider>
  );
}

export {App};
