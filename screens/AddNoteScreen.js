import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react';
import React from 'react'

const AddNoteScreen = ({onSave}) => {
    const [enteredText, setEnteredText] = useState("")
    const handleChange = (val)=>{
        setEnteredText(val)
    }
    const handleClick = () => {
        if(enteredText.trim().length>0){
            onSave(enteredText);
        }
    }
  return (
    <View style={styles.container}>
      <Text>Addnote</Text>
      <View style={styles.textAreaContainer} >
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={20}
        onChangeText={handleChange}
      />

      <Button  onPress={handleClick} title='Add'/>
     </View>
    </View>
  )
}

export default AddNoteScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    textAreaContainer:{
        borderWidth: 1,
        borderColor: "grey",
    },
    textArea: {
        height: 150,
        padding: 10
    }

})