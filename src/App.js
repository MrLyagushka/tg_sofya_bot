import { useState, useEffect } from 'react';
import './App.css';
import { FaPills, FaCheckCircle, FaTimesCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicinesData, setMedicinesData] = useState({});
  const [inputValue, setInputValue] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  const getMedicinesForDate = (date) => {
    const dateKey = formatDate(date);
    return medicinesData[dateKey] || [];
  };

  const addMedicine = () => {
    if (inputValue.trim() === '') return;
    
    const dateKey = formatDate(selectedDate);
    const currentMedicines = getMedicinesForDate(selectedDate);
    
    const newMedicine = {
      id: Date.now(),
      name: inputValue,
      taken: false
    };
    
    setMedicinesData({
      ...medicinesData,
      [dateKey]: [...currentMedicines, newMedicine]
    });
    
    setInputValue('');
  };

  const toggleMedicine = (medicineId) => {
    const dateKey = formatDate(selectedDate);
    const currentMedicines = getMedicinesForDate(selectedDate);
    
    const updatedMedicines = currentMedicines.map(med => 
      med.id === medicineId ? { ...med, taken: !med.taken } : med
    );
    
    setMedicinesData({
      ...medicinesData,
      [dateKey]: updatedMedicines
    });
  };

  const deleteMedicine = (medicineId) => {
    const dateKey = formatDate(selectedDate);
    const currentMedicines = getMedicinesForDate(selectedDate);
    
    const updatedMedicines = currentMedicines.filter(med => med.id !== medicineId);
    
    setMedicinesData({
      ...medicinesData,
      [dateKey]: updatedMedicines
    });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="app-container">
      {/* Заголовок */}
      <h1 className="app-header">
        <FaPills className="icon-lg" /> Ежедневник лекарств
      </h1>

      {/* Навигация по дням */}
      <div className="date-navigation">
        <button className="btn btn-primary" onClick={goToPreviousDay}>
          <FaChevronLeft className="icon" /> Вчера
        </button>

        <div className="date-display">
          {formatDisplayDate(selectedDate)}
        </div>

        <button 
          className={`btn ${selectedDate.toDateString() === new Date().toDateString() ? 'btn-success active' : 'btn-today'}`} 
          onClick={goToToday}
        >
          Сегодня
        </button>

        <button className="btn btn-primary" onClick={goToNextDay}>
          Завтра <FaChevronRight className="icon" />
        </button>
      </div>

      {/* Форма добавления */}
      <div className="add-form">
        <div className="add-form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Название лекарства..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMedicine()}
          />
          <button className="btn btn-add" onClick={addMedicine}>
            Добавить
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="stats-card">
        <div className="stats-label">
          Статистика за {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </div>
        <div className="stats-value">
          {getMedicinesForDate(selectedDate).filter(m => m.taken).length} из {getMedicinesForDate(selectedDate).length} принято
        </div>
      </div>

      {/* Список лекарств */}
      <div className="medicines-list">
        {getMedicinesForDate(selectedDate).length === 0 ? (
          <div className="empty-state">
            Нет лекарств за этот день. Добавьте первое!
          </div>
        ) : (
          getMedicinesForDate(selectedDate).map((med) => (
            <div 
              key={med.id} 
              className={`medicine-card ${med.taken ? 'taken' : ''}`}
            >
              <span className={`medicine-name ${med.taken ? 'taken' : ''}`}>
                {med.name}
              </span>
              
              <div className="actions-group">
                <button 
                  className={`btn btn-action ${med.taken ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => toggleMedicine(med.id)}
                >
                  {med.taken ? (
                    <>
                      <FaTimesCircle className="icon" /> Отменить
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="icon" /> Принято
                    </>
                  )}
                </button>
                
                <button
                  className="btn btn-delete btn-danger"
                  onClick={() => deleteMedicine(med.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;