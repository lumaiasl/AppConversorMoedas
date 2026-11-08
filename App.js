import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from './services/api';

import { PickerItem } from './picker';
export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
  const [moedaBValor, setMoedaBValor] = useState("")

  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(0)

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

  async function converter(){
    if(moedaBValor === 0 || moedaBValor === "" || moedaSelecionada === null)  
      return;

    const response = await api.get(`/all/${moedaSelecionada}-BRL`)
    
    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))

    setValorConvertido(`${resultado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`)
    setValorMoeda(moedaBValor)

    Keyboard.dismiss();
  }

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
          onValueChange={ (moeda) => {
            setMoedaSelecionada(moeda)
            setValorConvertido(0)
          }}
        />
      </View>

      <View style={styles.areaValor}>
        <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
        <TextInput 
          placeholder='EX: 1.50'
          style={styles.input}
          keyboardType='numeric'
          value={moedaBValor}
          onChangeText={ (valor) => setMoedaBValor(valor)}
        />
      </View>

      <TouchableOpacity style={styles.botaoArea} onPress={converter}>
        <Text style={styles.botaoText}>Converter</Text>
      </TouchableOpacity>

      {valorConvertido !== 0 && (
        <View style={styles.areaResultado}>
          <Text style={styles.valorConvertido}>
            {valorMoeda} {moedaSelecionada}
          </Text>
          <Text style={{ fontSize: 18, margin: 8, fontWeight: '500', color: '#000'}}>
            Corresponde a
          </Text>
          <Text style={styles.valorConvertido}>
            {valorConvertido}
          </Text>
      </View>
      )}
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
  },
  areaResultado:{
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',  
    padding: 24,
  },
  valorConvertido:{
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  }
});
