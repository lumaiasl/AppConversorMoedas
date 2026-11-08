import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from './services/api';

import { PickerItem } from './picker';
export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null)

  useEffect(() => {
    async function loadMoedas(){
      const response = await api.get("all")
      let arrayMoedas = [];
      Object.keys(response.data).map( (key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        })
      })

      setMoedas(arrayMoedas);
      setMoedaSelecionada(arrayMoedas[0].key)
      setLoading(false);
    }

    loadMoedas();
  }, [])

  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems:  "center", backgroundColor: '#101215'}}>
        <ActivityIndicator color={'#fff'} size={48}></ActivityIndicator>
      </View>
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Selecione uma moeda</Text>
        <PickerItem 
          moedas={moedas}
          moedaSelecionada={moedaSelecionada}
          onChange={ (moeda) => {
            setMoedaSelecionada(moeda)
          }}
        />
      </View>

      <View style={styles.areaValor}>
        <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
        <TextInput 
          placeholder='EX: 1.50'
          style={styles.input}
          keyboardType='numeric'
        />
      </View>

      <TouchableOpacity style={styles.botaoArea}>
        <Text style={styles.botaoText}>Converter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
  }
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
  areaValor:{
    width: '90%',
    backgroundColor: "#f9f9f9",
    paddingTop: 8,
    paddingBottom: 8,
  },
  input:{
    width: '100%',
    padding: 8,
    fontSize: 18
  },
  botaoArea:{
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  botaoText:{
    color: "#000",
    fontWeight: 'bold',
    fontSize: 16,
  }
});
