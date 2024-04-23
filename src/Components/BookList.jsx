import { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/style.css'; // Import the CSS file containing the styles used in App.jsx

const BookList = ({ books, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValues, setEditValues] = useState({});

  const handleEdit = (index, book) => {
    setEditIndex(index);
    setEditValues(book);
  };

  const handleSave = () => {
    onEdit(editIndex, editValues);
    setEditIndex(-1);
    setEditValues({});
  };

  return (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          {index === editIndex ? (
            <>
              <input 
                type="text"
                value={editValues.title}
                onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and mb-2 for bottom margin from style.css
              />
              <input
                type="text"
                value={editValues.author}
                onChange={(e) => setEditValues({ ...editValues, author: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and mb-2 for bottom margin from style.css
              />
              <input
                type="text"
                value={editValues.isbn}
                onChange={(e) => setEditValues({ ...editValues, isbn: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and mb-2 for bottom margin from style.css
              />
              <input
                type="date"
                value={editValues.publicationDate}
                onChange={(e) => setEditValues({ ...editValues, publicationDate: e.target.value })}
                className="form-control mb-2" // Apply the form-control class and mb-2 for bottom margin from style.css
              />
              <button onClick={handleSave} className="btn btn-success ml-2">Save</button> {/* Apply Bootstrap button classes and mb-2 for bottom margin */}
            </>
          ) : (
            <>
              {book.title} by {book.author} ({book.isbn})
              <button onClick={() => handleEdit(index, book)} className="btn btn-info ml-2">Edit</button> {/* Apply Bootstrap button classes and ml-2 for left margin */}
              <button onClick={() => onDelete(index)} className="btn btn-danger ml-2">Delete</button> {/* Apply Bootstrap button classes and ml-2 for left margin */}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      publicationDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
