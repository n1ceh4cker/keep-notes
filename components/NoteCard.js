import React from 'react'
import { View } from 'react-native'
import { Card, Chip, Paragraph } from 'react-native-paper'

function NoteCard({ note, edit }) {
  return (
    <Card mode='outlined' style={{ margin:5 }} onPress={edit}>
      <Card.Title
        title={note.title}
        titleNumberOfLines={2}
        />
      <Card.Content>
        <Paragraph>
          {note.content}
        </Paragraph>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
        {note.labels ? note.labels.map(label =>  <Chip key={label}>{label}</Chip>):null}
        </View>
      </Card.Content>
    </Card>
  )
}
export default NoteCard
