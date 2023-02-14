import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItem = ({note}) => {
    return (
        <View style={styles.ListItem}>
            <Text>{note}</Text>
        </View>
    );
};
export default ListItem

const styles = StyleSheet.create({
    ListItem: {
        borderWidth: 5,
        borderColor: "green",
        padding: 10,
        borderRadius: 7,
        backgroundColor: "lightgrey",
        marginTop: 5,
    }
})