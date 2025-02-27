import React, { useState } from 'react';

const Settings = () => {
  const [fields, setFields] = useState([
    { name: 'requestTitle', label: 'Request Title', type: 'text' },
    { name: 'requestedBy.empId', label: 'Requested By (Emp ID)', type: 'text' },
    { name: 'requestedBy.empName', label: 'Requested By (Emp Name)', type: 'text' },
    { name: 'department', label: 'Department', type: 'dropdown', options: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Other'] },
    // Add other fields as needed
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', label: '', type: 'text', options: [] }]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleAddOption = (index) => {
    const newFields = [...fields];
    newFields[index].options.push('');
    setFields(newFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFields(newFields);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options = newFields[fieldIndex].options.filter((_, i) => i !== optionIndex);
    setFields(newFields);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="flex items-center space-x-4 mb-2">
              <span className="flex-1">{field.label}</span>
              <span className="p-2 border rounded">{field.type}</span>
              {isEditing && (
                <>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                    placeholder="Field Label"
                    className="flex-1 p-2 border rounded"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    {/* Add other field types as needed */}
                  </select>
                  <button onClick={() => handleRemoveField(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
                </>
              )}
            </div>
            {isEditing && field.type === 'dropdown' && (
              <div className="space-y-2">
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                      placeholder="Option"
                      className="flex-1 p-2 border rounded"
                    />
                    <button onClick={() => handleRemoveOption(index, optionIndex)} className="p-2 bg-red-500 text-white rounded">Remove</button>
                  </div>
                ))}
                <button onClick={() => handleAddOption(index)} className="p-2 bg-blue-500 text-white rounded">Add Option</button>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <button onClick={handleAddField} className="p-2 bg-green-500 text-white rounded">Add Field</button>
        )}
      </div>
      <button onClick={() => setIsEditing(!isEditing)} className="mt-4 p-2 bg-blue-500 text-white rounded">
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Settings;