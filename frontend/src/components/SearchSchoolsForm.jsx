import { useState } from 'react';
import { searchSchools } from '../services/api';

const SearchSchoolsForm = () => {
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setCoordinates({ ...coordinates, [e.target.name]: e.target.value });
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setAlert({ type: 'error', message: 'Geolocation is not supported by your browser' });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        });
      },
      () => {
        setAlert({ type: 'error', message: 'Unable to retrieve your location' });
      }
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!coordinates.latitude || !coordinates.longitude) {
      setAlert({ type: 'error', message: 'Please provide both latitude and longitude' });
      return;
    }

    setLoading(true);
    setAlert({ type: '', message: '' });
    
    try {
      const response = await searchSchools(coordinates.latitude, coordinates.longitude);
      if (response.success) {
        setSchools(response.data);
        setHasSearched(true);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to fetch schools'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="glass-panel">
        {alert.message && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSearch}>
          <div className="form-row" style={{ alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                className="form-input"
                placeholder="e.g. 40.7128"
                value={coordinates.latitude}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                className="form-input"
                placeholder="e.g. -74.0060"
                value={coordinates.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-primary" style={{ background: '#64748b' }} onClick={handleLocateMe}>
              📍 Use My Location
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Search Nearby'}
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div style={{ marginTop: '2.5rem' }}>
          <div className="results-header">
            <h3 style={{ fontSize: '1.25rem' }}>Nearest Schools</h3>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{schools.length} found</span>
          </div>
          
          {schools.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', color: '#64748b' }}>
              No schools found in the database.
            </div>
          ) : (
            <div className="school-grid">
              {schools.map(school => (
                <div key={school.id} className="school-card">
                  <div className="school-name">{school.name}</div>
                  <div className="school-address">📌 {school.address}</div>
                  <div className="school-distance">🚀 {school.distance} away</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchSchoolsForm;
