import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Game from './elements/Game'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path='/:id'
            element={(
              <Game/>
            )}
          />
          <Route
            path='*'
            element={<Navigate to={`/${Date.now().toString(16)}`} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
