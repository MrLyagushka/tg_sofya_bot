import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;


function App() {

  const [medicines, setMedicines] = useState([
    {id: 1, name: "Аспирин", taken: false},
    {id: 2, name: "Витамин Б", taken: false},
    {id: 3, name: "Витамин С", taken: false}
  ])

  const toggleMedicine = (id) => {
    setMedicines(medicines.map(med =>
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  }

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <h1>Ежедневник лекарств</h1>
      {medicines.map(med => (
        <div style={{
          width: '0 auto',
          margin: '0 auto'
        }} key={med.id}>
        <span style={{
          textDecoration: med.taken ? 'line-through' : 'none',
          color: med.taken ? 'green' : 'white'
        }}>
          {med.name}
        </span>
        <button onClick={() => toggleMedicine(med.id)}>
          {med.taken ? '❌ Отменить' : '✅ Принято'}
        </button>
        </div>
      ))}
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
