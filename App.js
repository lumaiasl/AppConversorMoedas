import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Selecione uma moeda</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    padding: 40,
    alignItems: 'center',
  },
  areaMoeda: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 2,
  },
  titulo:{
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
