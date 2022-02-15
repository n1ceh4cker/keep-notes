import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { TextInput, List, IconButton, useTheme } from 'react-native-paper';
import { NoteContext } from '../context/NoteContext';

function CreateLabel({ hideModal }) {
  const [label, setLabel] = useState('')
  const [focused, setFocused] = useState(false)
  const theme = useTheme()
  const textInputRef = useRef(null)
  return (
    <NoteContext.Consumer>{(context) => {
      const { labels, addLabel } = context
      const handleSubmit = () => {
        if(label==''){
          textInputRef.current.blur()
        }
        else{
          addLabel(label)
          setLabel('')
          textInputRef.current.blur()
        }
      }
      const leftIcon = focused ? 
        <TextInput.Icon name='close' onPress={() => textInputRef.current.blur()} />:
        <TextInput.Icon name='plus' /> 
      const rightIcon = focused ?
        <TextInput.Icon name='check' onPress={handleSubmit}/>:null
      return(
        <View>
          <IconButton
            icon='keyboard-backspace'
            onPress={hideModal}
          />
          <TextInput
            placeholder='Create new label'
            value={label}
            onChangeText={(e) => setLabel(e)}
            underlineColor= {theme.colors.background}
            style={{ backgroundColor: theme.colors.background }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            left={leftIcon}
            right={rightIcon}
            ref={textInputRef}
            />
          <List.Section>
            {labels.map(label => (
              <List.Item
                key={label}
                title={label}
                left={() => <List.Icon icon='label-outline' />}
                />
            ))}
          </List.Section>
        </View>
      )
    }}
    </NoteContext.Consumer>
  )
}
export default CreateLabel
