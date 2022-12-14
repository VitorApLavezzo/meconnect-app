import { StatusBar, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import HorizontalLine from '../../components/HorizontalLine';
import MCButton from '../../components/MCButton';

export default function EscolherConta({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'}/>
      <Text style={styles.title}>Escolha seu tipo de Conta</Text>

      <MCButton
        size='large'
        onClick={() => navigation.navigate("RegistreEmpresa")}>
        Empresa ou Organização
      </MCButton>

      <MCButton
        style={{ marginTop: 10, }}
        size='large'
        onClick={() => navigation.navigate("RegistreCliente")}>
        Cliente
      </MCButton>

      <HorizontalLine width={'80%'} marginVertical={20} />

      <MCButton
        size='medium'
        styleType='secondary'
        onClick={() => navigation.navigate("Login")}>
        Fazer login
      </MCButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  }
});
