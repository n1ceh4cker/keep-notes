import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { TextInput, IconButton, Modal, Portal, Checkbox, Colors, useTheme} from 'react-native-paper';
import { NoteContext } from '../context/NoteContext';

function CreateNote({ navigation, route }) {
  const note = route.params?.note
  const deleted = route.params?.deleted
  const context = useContext(NoteContext)
  const [labels, setLabels] = useState(note ? note.labels : [])
  const [title, setTitle] = useState(note ? note.title : '')
  const [content, setContent] = useState(note ? note.content : '')
  const [visible, setVisible] = useState(false)
  const { addNote, editNote, deleteNote, deleteNoteForever, restoreNote } = context
  const userLabels = context.labels     
  const theme = useTheme()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return backHandler.remove
  })
  const handleBackPress = () => {
    if (visible) setVisible(false)
    else handleSubmit()
    return true
  }
  const handleSubmit = () => {
    if(title=='' && content==''){
      navigation.navigate({
        name: 'Notes',
        params: { visible: true },
        merge: true
      })
    }
    else{
      note ? 
        editNote({id: note.id, title, content, labels})
        :addNote({id: Date.now(), title, content, labels})
      navigation.goBack()
    }
  }
  const handleLabel = (lbl) =>{
    labels.includes(lbl)?
      setLabels(labels.filter(l => l!==lbl)):setLabels([...labels,lbl])
    }
  return(
    <View style={styles(theme).page}>
      <View style={styles(theme).row}>
        {!deleted?
        (<>
          <IconButton
            icon='keyboard-backspace'
            onPress={handleSubmit}
            style={{marginRight: 'auto'}}
            />
          <IconButton
            icon='label-outline'
            onPress={() => setVisible(true)}
            />
          <IconButton
            icon='delete-outline'
            onPress={() => {note ? deleteNote(note): null;navigation.goBack()}}
            />
          </>):(<>
            <IconButton
              icon='keyboard-backspace'
              style={{marginRight: 'auto'}}
              />
            <IconButton
              icon='restore'
              onPress={() => {restoreNote(note);navigation.goBack()}}
              />
            <IconButton
              icon='delete-forever'
              onPress={() => {deleteNoteForever(note.id);navigation.goBack()}}
              />
          </>
          )}
      </View>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={(e) => setTitle(e)}
        multiline
        underlineColor= {theme.colors.background}
        style={{ backgroundColor: theme.colors.background }}
        editable={!deleted}
        />
      <TextInput
        placeholder='Content'
        value={content}
        onChangeText={(e) => setContent(e)}
        multiline
        underlineColor= {theme.colors.background}
        style={{ backgroundColor: theme.colors.background, flexGrow:1 }}
        editable={!deleted}
        />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={styles(theme).modal}
          >
          <IconButton
            icon='keyboard-backspace'
            onPress={() => setVisible(false)}
            />
          {
            userLabels.map(lbl => (
              <Checkbox.Item 
                key={lbl}
                label={lbl} 
                status={labels.includes(lbl)?'checked': 'unchecked'} 
                onPress={() => handleLabel(lbl)}/>
            ))  
          }
        </Modal>  
      </Portal>  
  </View>
  )
}
const styles = theme => StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  row: { 
    display: 'flex', 
    flexDirection: 'row' 
  },
  modal: {
    marginTop:0,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.background
  }
})
export default CreateNote