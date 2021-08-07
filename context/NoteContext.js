import React, { createContext, useState, useEffect } from 'react'
import store from 'react-native-simple-store'

export const NoteContext = createContext()
function NoteContextProvider({ children }) {
  const [notes,setNotes] = useState([
    {
      id:7894563,
      title: "Find out your DNS server",
      content: "nmcli dev show | grep 'IP4.DNS'",
      labels: ["Note"],
      deleted: false
    },
    {
      id: 1223466,
      labels :["Work"],
      content: "add env file & deploy your app on netlify",
      title: "Deploy app",
      deleted: false 
    },
    {
      id: 1245875,
      labels: ["Work"],
      content: "If you by mistake cancel gh-pages deploy then just delete the node_modules/.cache/gh-pages directory and it will work fine",
      title: "github pages deploy error resolved",
      deleted: false 
    },
    {
      id: 1234567,
      labels: ["Money"],
      content: "https://www.howtoforge.com/tutorial/ubuntu-ruby-on-rails/",
      title: "Install ruby on rails",
      deleted: false 
    },
    {
      id:7654123,
      labels: ["Work"],
      content: 'mongo "mongodb+srv://root_0:znTy8aQ5JLTxer5@dot-slash-4nrmd.mongodb.net/food?retryWrites=true&w=majority"',
      title: "Connecting to mongo",
      deleted: false 
    }
  ])
  
  const [labels, setLabels] = useState(['Work', 'Money', 'Note'])
  useEffect(() => {
    async function fetchData(){
      const nts = await store.get('notes')
      nts ? setNotes(nts) : await store.save('notes', notes)
      const lbls = await store.get('labels')
      lbls ? setLabels(lbls) : await store.save('labels', labels)
  /* await store.delete('notes')
      await store.delete('labels')*/
    }
    fetchData()
  }, [])
  const addNote = async(note) => {
    note.deleted = false
    await store.save('notes',[...notes,note]) 
    setNotes([...notes,note])
  }
  const editNote = async(note) => {
    note.deleted = false
    const restNotes = notes.filter(nte => note.id!==nte.id)
    await store.save('notes', [...restNotes, note])
    setNotes([...restNotes, note])
  }
  const deleteNote = async(note) => {
    const restNotes = notes.filter(nte => note.id!==nte.id)
    note.deleted = true
    await store.save('notes', [...restNotes, note])
    setNotes([...restNotes, note])
  }
  const deleteNoteForever = async(id) => {
    const newNotes = notes.filter(note => note.id!==id)
    await store.save('notes', newNotes)
    setNotes(newNotes)
  }
  const restoreNote = async(note) => {
    const restNotes = notes.filter(nte => note.id!==nte.id)
    note.deleted = false
    await store.save('notes', [...restNotes, note])
    setNotes([...restNotes, note])
  }
  const addLabel = async(label) => {
    await store.save('labels', [...labels,label])
    setLabels([...labels,label])
  }
  const deleteLabel = async(l) => {
    const newLabels = labels.filter(label => label!==l)
    await store.save('labels', newLabels)
    setLabels(newLabels)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, deleteNoteForever, restoreNote, labels, addLabel, deleteLabel }}>
      {children}
    </NoteContext.Provider>
  )
}


export default NoteContextProvider