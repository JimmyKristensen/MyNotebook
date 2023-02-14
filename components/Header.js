import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>My notebook</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: "13%",
    backgroundColor: Platform.OS == "android" ? "green" : "white",
    paddingTop: 30
  },

  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: Platform.OS == "android" ? "white" : "green",
    paddingTop: 15,
  }
})