import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Addbar from './components/Addbar';
import Backbutton from './components/Backbutton';
import Header from './components/Header';
import { ScreenType } from './constants/constants';
import AddNoteScreen from './screens/AddNoteScreen';
import AllNoteScreen from './screens/AllNoteScreen';



export default function App() {
  const [screen, setScreen] = useState(ScreenType.home)
  const [notes, setNotes] = useState([])
  let content;
  if(screen === ScreenType.addNote){
    content = <AddNoteScreen onSave={(data) => {
      setNotes([...notes,{id:Date.now(), note:data}])
    }}/>
  } else if(screen === ScreenType.home){
    content = <AllNoteScreen notes={notes}/>
  }
  console.log(notes)
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
