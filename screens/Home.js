import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, FAB, Searchbar, Snackbar, useTheme } from 'react-native-paper';
import NoteCard from '../components/NoteCard';
import { NoteContext } from '../context/NoteContext';

function HomeScreen({ navigation, route }) {
  const  label  = route.params?.label
  const deleted = route.params?.deleted ? true : false
  const [visible, setVisible] = useState(route.params?.visible ? true : false)
  const theme = useTheme()
  return (
    <NoteContext.Consumer>{(context) => {
      const { notes } = context
      return(
        <View style={styles(theme).page}>
        <Searchbar
          icon='menu'
          onIconPress={navigation.toggleDrawer}
          placeholder='Search your notes'
          style={{margin: 10, marginBottom: 5}}
          caretHidden={true}
          clearButtonMode='always'
        />
        <FlatList 
          keyExtractor={(item) => item.id.toString()}
          data={label?notes.filter(note => note.deleted===deleted&&note.labels.includes(label)): notes.filter(note => note.deleted===deleted)}
          renderItem={({item}) => (
            <NoteCard 
              note={item} 
              edit={() => navigation.navigate('CreateNote', { note : item, deleted: deleted})}
              />
          )}
          />
        {
          !deleted&&
          <FAB
            style={styles(theme).fab}
            icon='plus'
            onPress={() => navigation.navigate('CreateNote')}
            />
        }
        <Snackbar
          visible={visible} 
          onDismiss={() => setVisible(false)}
          style={styles(theme).snackbar}
          >
          Empty Note Discarded
        </Snackbar>
        </View>
      )}}
    </NoteContext.Consumer>
  )
}
const styles = theme => StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
		snackbar: {
			position: 'absolute',
      bottom: 75
		},
		fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0
    }
})
export default HomeScreen