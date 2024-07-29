import './App.css'
import NotePage from './pages/NotePage'
import NoteProvider from './Context/NoteContext'

function App() {
  

  return (
      <div id='app'>
         <NoteProvider>
         <NotePage />
       </NoteProvider>
      </div>
  )
}

export default App
