import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContex';
import 'react-native-reanimated';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={{flex:1, paddingInline:16, backgroundColor:'#fff'}}>
          <Navigation/>  
          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

