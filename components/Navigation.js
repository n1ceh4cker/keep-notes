import React, { useState, useContext } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { Colors, Drawer, Modal, Portal, useTheme } from 'react-native-paper'
import { NoteContext } from '../context/NoteContext'
import HomeScreen from '../screens/Home'
import CreateLabel from '../screens/CreateLabel'
import CreateNote from '../screens/CreateNote'

const StackNav = createStackNavigator()
const DrawerNav = createDrawerNavigator()
const CustomDrawer = ({ props, navigation, state }) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
	const showModal = () => {setVisible(true); navigation.closeDrawer()}
	const hideModal = () => {setVisible(false)}
    return(
      <DrawerContentScrollView {...props} contentContainerStyle={styles(theme).drawerContent}>
        <Drawer.Section title='Note App'>
          <Drawer.Item
            label='Home'
            icon='text-subject'
            onPress={() => navigation.navigate('Home')}
            active={state.routeNames[state.index]=='Home'? true: false}
            />
        </Drawer.Section>
        <Drawer.Section title='Labels'>
          <NoteContext.Consumer>{(context) => {
            const { labels } = context
            return labels.map(label => (
              <Drawer.Item
                key={label}
                label={label}
                icon='label-outline'
                onPress={() => navigation.navigate(label)}
                active={state.routeNames[state.index]==label? true: false}
                />
            ))
          }}
          </NoteContext.Consumer>
          <Drawer.Item
            label='Create New Label'
            icon='plus'
            onPress={showModal}
            />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item 
            label='Deleted' 
            icon='delete-outline'
            onPress={() => navigation.navigate('Deleted')} 
            />
        </Drawer.Section>
        <Portal>
          <Modal 
            style={styles(theme).modal}
            visible={visible} 
            onDismiss={hideModal} 
            
            >
            <CreateLabel hideModal={hideModal} />
          </Modal>
			  </Portal>
      </DrawerContentScrollView>
    )
}
const HomeNavigator = ({ route, navigation }) => {
  const label = route.params?.label
  const deleted = route.params?.deleted
  return(
    <StackNav.Navigator
      initialRouteName='Notes'
      mode='modal'
      screenOptions={{
          headerShown:false
      }}>
      <StackNav.Screen name='Notes' component={HomeScreen} initialParams={{ label: label, deleted: deleted }}/>
      <StackNav.Screen name='CreateNote' component={CreateNote} options={{headerShown: false}}/>
    </StackNav.Navigator>
  )
}
function Navigation() {
  const context = useContext(NoteContext)
  const { labels } = context
  return (
    <DrawerNav.Navigator 
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      >
      <DrawerNav.Screen name="Home" component={HomeNavigator} />    
      {labels.map(label => (
        <DrawerNav.Screen 
          key={label}
          name={label}
          component={HomeNavigator} 
          initialParams={{ label: label }}
          />
      ))}
      <DrawerNav.Screen name='Deleted' 
        component={HomeNavigator}
        initialParams={{ deleted: true }} />
    </DrawerNav.Navigator>
  )
}
const styles = theme => StyleSheet.create({
    modal: {
      marginTop:0,
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background
    },
    drawerContent: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})
export default Navigation
