import ApronCard from './components/ApronCard';
import React from 'react';
import './App.css';

const sample = [
  {name: 'Tom Jones' , role: 'Barista' , image: ''},
  {name: 'Susie Taylor' , role: 'Shift Supervisor' , image: ''}
]
function App() {
  return (
    <div className="App">
      <h1>Green Apron Board</h1>
      <ApronCard people={sample} />
    </div>

    
  );
}

export default App;
