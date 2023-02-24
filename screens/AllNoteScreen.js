import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListItem from '../components/ListItem'


const AllNoteScreen = ({notes}) => {
    const renderItem = (itemData) => {
        return <ListItem note={itemData.item.text}/>
    }
    return (
        <View>
            <FlatList data={notes} renderItem={renderItem} />
        </View>
    )
}

export default AllNoteScreen

const styles = StyleSheet.create({})