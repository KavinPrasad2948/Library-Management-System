import { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/style.css'; // Import the CSS file containing the styles used in App.jsx

const AuthorList = ({ authors, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValues, setEditValues] = useState({});

  const handleEdit = (index, author) => {
    setEditIndex(index);
    setEditValues(author);
  };

  const handleSave = () => {
    onEdit(editIndex, editValues);
    setEditIndex(-1);
    setEditValues({});
  };

  return (
    <ul>
      {authors.map((author, index) => (
        <li key={index}>
          {index === editIndex ? (
            <>
              <input
                type="text"
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and margin-bottom class
              />
              <input
                type="date"
                value={editValues.birthDate}
                onChange={(e) => setEditValues({ ...editValues, birthDate: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and margin-bottom class
              />
              <input
                type="text"
                value={editValues.biography}
                onChange={(e) => setEditValues({ ...editValues, biography: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and margin-bottom class
              />
              <button onClick={handleSave} className='btn btn-success ml-2'>Save</button>
            </>
          ) : (
            <>
              {author.name}, born on {author.birthDate}
              <button onClick={() => handleEdit(index, author)} className='btn btn-info ml-2'>Edit</button>
              <button onClick={() => onDelete(index)} className='btn btn-danger ml-2'>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      biography: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AuthorList;
