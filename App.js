import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Addbar from './components/Addbar';
import Backbutton from './components/Backbutton';
import Header from './components/Header';
import { ScreenType } from './constants/constants';
import AddNoteScreen from './screens/AddNoteScreen';
import AllNoteScreen from './screens/AllNoteScreen';
import {database} from './config/Firebase';
import {collection, addDoc, orderBy, query, onSnapshot} from 'firebase/firestore';



export default function App() {
  const [screen, setScreen] = useState(ScreenType.home)
  const [notes, setNotes] = useState([])
  const fireNotes = 'notes';
  const fireNoteRef = collection(database,fireNotes)
  let content;
  const readDB = () => {
    const q = query(fireNoteRef, ref => ref.orderBy('createdAt', 'desc'));
    const snapArrya = [];
    onSnapshot(q, snapshot => {
      snapshot.forEach(snap =>{
        snapArrya.push({
          ...snap.data(),
          key : snap.id
        });
      });
      setNotes(snapArrya);
    })
   }
  if(screen === ScreenType.addNote){
    content = <AddNoteScreen onSave={(data) => {
      addDoc(fireNoteRef, {
        text: data
      })
    }}/>
  } else if(screen === ScreenType.home){
    content = <AllNoteScreen notes={notes}/>
  }  
  
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.navBar}>
        <Backbutton OnButtonClick={(data) => {
            setScreen(data)
          }}/>
        <Addbar onExit={(data) => {
            setScreen(data)
          }}/>
      </View>
      <Button title='Show all note' onPress={readDB}></Button>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  }
});
