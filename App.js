import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View , Image} from 'react-native';
import Addbar from './components/Addbar';
import Backbutton from './components/Backbutton';
import Header from './components/Header';
import { ScreenType } from './constants/constants';
import AddNoteScreen from './screens/AddNoteScreen';
import AllNoteScreen from './screens/AllNoteScreen';
import {database, storage} from './config/Firebase';
import {collection, addDoc, query, onSnapshot} from 'firebase/firestore';
import { async } from '@firebase/util';
import {ref, uploadBytes} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'



export default function App() {
  /* Use state */
  const [screen, setScreen] = useState(ScreenType.home)
  const [notes, setNotes] = useState([])


  /* Name of the collection on firebase */
  const fireNotes = 'notes';
  const fireNoteRef = collection(database,fireNotes)
  let content;

  /* reads the note collection */
  const readDB = () => {
    const q = query(fireNoteRef, ref => ref.orderBy('createdAt', 'desc'));
    /* New array to save the data in */
    const snapArrya = [];
    /* Snapshit is an active listener to react to any changes to the query,
       call the onSnapshot method with an event handler callback*/
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
   
   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality:1,
    })

    if (!result.canceled) {
        console.log(result);
        const source = { uri: result.assets[0].uri };
        uploadImage(source);
    } else {
        alert('No image selected');
    }
  };

  const uploadImage = async (imageToUpload) => {
    try {
        const imageUri = imageToUpload.uri;
        let imageName = imageUri.slice(-20);
        const response = await fetch(imageUri)
        const blob = await response.blob()
        if (imageName.includes("/")) {
          imageName = imageName.replaceAll("/", "");
        };
        const reference = ref(storage, imageName)
        const result = await uploadBytes(reference, blob)
    } catch (error) {
        console.log(error);
    }
  }
   

  /* Navigation*/
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
      <Button title='Pick Image' onPress={pickImage}></Button>
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
