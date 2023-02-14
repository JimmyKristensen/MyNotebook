import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScreenType } from '../constants/constants';

const Addbar = ({onExit}) => {
  return (
    <View>
        <Pressable onPress={() => onExit(ScreenType.addNote)}>
            <FontAwesome style={styles.plus} name='plus'></FontAwesome>
        </Pressable>
    </View>
  )
}

export default Addbar

const styles = StyleSheet.create({
    plus: {
        fontSize: 30
    }
})