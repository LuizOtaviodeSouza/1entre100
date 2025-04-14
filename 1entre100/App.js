import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';

export default function App() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [jogoEncerrado, setJogoEncerrado] = useState(false);

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const numero = Math.floor(Math.random() * 100) + 1;
    setNumeroAleatorio(numero);
    setMensagem('');
    setPalpite('');
    setTentativas(5);
    setJogoEncerrado(false);
  };

  const verificarPalpite = () => {
    if (jogoEncerrado) return;

    const numeroDigitado = parseInt(palpite);
    Keyboard.dismiss();

    if (isNaN(numeroDigitado) || numeroDigitado < 1 || numeroDigitado > 100) {
      Alert.alert('Número inválido', 'Digite um número entre 1 e 100');
      return;
    }

    if (numeroDigitado === numeroAleatorio) {
      setMensagem('🎉 Você acertou! Vitória!');
      setJogoEncerrado(true);
    } else {
      const novaTentativa = tentativas - 1;

      if (novaTentativa === 0) {
        setMensagem(`☠️ Fim de jogo! O número era ${numeroAleatorio}`);
        setJogoEncerrado(true);
      } else {
        let dicaBase = numeroDigitado > numeroAleatorio ? 'Muito alto!' : 'Muito baixo!';
        let dicaExtra = '';

        const diferenca = Math.abs(numeroDigitado - numeroAleatorio);

        if (diferenca <= 5) {
          dicaExtra = ' 🔥 Está muito perto!';
        } else if (diferenca <= 10) {
          dicaExtra = ' 👀 Está perto.';
        } else {
          // Dica de faixa
          const faixaInicio = Math.floor((numeroAleatorio - 1) / 10) * 10 + 1;
          const faixaFim = faixaInicio + 9;
          dicaExtra = ` 💡 Dica: está entre ${faixaInicio} e ${faixaFim}.`;
        }

        setMensagem(`${dicaBase}${dicaExtra}`);
        setTentativas(novaTentativa);
      }
    }

    setPalpite('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Adivinhe o Número</Text>
      <Text style={styles.subtitle}>Escolha um número entre 1 e 100</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu palpite"
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        editable={!jogoEncerrado}
      />

      <View style={styles.button}>
        <Button title="Verificar" onPress={verificarPalpite} disabled={jogoEncerrado} />
      </View>

      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}

      <View style={styles.resetButton}>
        <Button title="Jogar Novamente" onPress={iniciarJogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: '60%',
    marginBottom: 15,
  },
  resetButton: {
    marginTop: 20,
    width: '60%',
  },
  mensagem: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  tentativas: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
});
