import { Api, Colors } from "meconnect-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Image, StatusBar, ToastAndroid } from "react-native";
import TopSearch from "../../../components/TopSearch";
import VendorProfile from "../../../components/VendorProfile";

export default function Perf({ navigation }) {
  const [vendors, setVendors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const renderItem = ({ item: { commercial, description, photo_url, banner_url, id } }) => (
    <VendorProfile
      id={id}
      commercial={commercial}
      description={description}
      photo_url={photo_url}
      banner_url={banner_url}
      navigation={navigation}
    />
  );

  function fetchDataError() {
    ToastAndroid.show('Ocorreu um erro ao buscar as notificações', ToastAndroid.LONG)
  }

  function refreshList(txt) {
    setVendors([])
    setShowPlaceholder(false)
    if (txt) {
      setIsLoading(true)
      Api.db.vendors.getByCommercial(txt).then(vendors => {
        if (vendors.length === 0) setShowPlaceholder(true)
        setVendors(vendors)
        setIsLoading(false)
      }).catch(() => {
        ToastAndroid.show('Ocorreu um erro ao fazer a busca', ToastAndroid.LONG)
      })
    } else {
      getTopsVendors()
    }
  }

  function getTopsVendors() {
    setIsLoading(true)
    Api.db.vendors.getTops(10).then(({ data }) => {
      setVendors(data)
      setIsLoading(false)
    }).catch(() => {
      ToastAndroid.show('Ocorreu um erro ao buscar os perfis', ToastAndroid.LONG)
    })
  }

  useEffect(() => {
    getTopsVendors()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.DarkOrange} />
      <TopSearch onChangeText={refreshList} />

      {showPlaceholder && <Text style={styles.placeholder}>Nenhum perfil encontrado</Text>}

      {isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color={Colors.DarkOrange} />}

      <FlatList
        data={vendors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.DarkGray
  },

});
