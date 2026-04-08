import { useState } from 'react';
import { addSchool } from '../services/api';

const AddSchoolForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    if (!formData.name.trim() || !formData.address.trim()) {
      setAlert({ type: 'error', message: 'Name and address are required' });
      setLoading(false);
      return;
    }

    try {
      const response = await addSchool(formData);
      if (response.success) {
        setAlert({ type: 'success', message: response.message });
        setFormData({ name: '', address: '', latitude: '', longitude: '' });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to add school'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">School Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="e.g. Springfield High School"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Complete Address</label>
          <input
            type="text"
            name="address"
            className="form-input"
            placeholder="123 Education Lane..."
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              className="form-input"
              placeholder="e.g. 40.7128"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              className="form-input"
              placeholder="e.g. -74.0060"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Add School'}
        </button>
      </form>
    </div>
  );
};

export default AddSchoolForm;
