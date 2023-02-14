import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScreenType } from '../constants/constants';

const Backbutton = ({ OnButtonClick }) => {
  return (
    <View style={styles.button}>
        <Pressable onPress={() => OnButtonClick(ScreenType.home)}>
            <FontAwesome style={styles.backButton} name='arrow-left'></FontAwesome>
        </Pressable>
    </View>

  )
}

export default Backbutton

const styles = StyleSheet.create({
    backButton: {
        fontSize: 30
    }
})