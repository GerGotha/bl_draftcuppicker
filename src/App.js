import logo from './logo.svg';
import './App.scss';
import Main from  './components/main';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from "react";


function App() {
  return (
        <div className="App" >
          <header className="App-header">
              <DndProvider backend={HTML5Backend}>
                  <Main/>
              </DndProvider>
          </header>
        </div>
  );
}

export default App;
