import { useState } from 'react';
import AddSchoolForm from './components/AddSchoolForm';
import SearchSchoolsForm from './components/SearchSchoolsForm';

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-logo">EduTrack</h1>
        <p className="app-subtitle">School Management System</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add School
        </button>
        <button 
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Search Schools
        </button>
      </div>

      <main>
        {activeTab === 'add' && <AddSchoolForm />}
        {activeTab === 'search' && <SearchSchoolsForm />}
      </main>
    </div>
  );
}

export default App;
