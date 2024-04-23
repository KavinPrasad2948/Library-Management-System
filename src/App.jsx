import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './css/style.css';
import BookList from './Components/BookList';
import AuthorList from './Components/AuthorList';

const App = () => {
  // Dummy data for books and authors
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Form validation schema using Yup
  const bookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication date is required'),
  });

  const authorSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    birthDate: Yup.date().required('Birth date is required'),
    biography: Yup.string().required('Biography is required'),
  });

  // Handlers for adding, editing, and deleting books and authors
  const handleAddBook = (values, { resetForm }) => {
    setBooks([...books, values]);
    resetForm();
  };

  const handleEditBook = (index, values) => {
    const updatedBooks = [...books];
    updatedBooks[index] = values;
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleAddAuthor = (values, { resetForm }) => {
    setAuthors([...authors, values]);
    resetForm();
  };

  const handleEditAuthor = (index, values) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = values;
    setAuthors(updatedAuthors);
  };

  const handleDeleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Library Management System Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Books</h2>
              <Formik
                initialValues={{ title: '', author: '', isbn: '', publicationDate: '' }}
                validationSchema={bookSchema}
                onSubmit={handleAddBook}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="text" name="title" placeholder="Title" className="form-control black-input" />
                      <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="text" name="author" placeholder="Author" className="form-control black-input" />
                      <ErrorMessage name="author" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="text" name="isbn" placeholder="ISBN" className="form-control black-input" />
                      <ErrorMessage name="isbn" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="date" name="publicationDate" className="form-control black-input" />
                      <ErrorMessage name="publicationDate" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>Add Book</button>
                  </Form>
                )}
              </Formik>
              <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Authors</h2>
              <Formik
                initialValues={{ name: '', birthDate: '', biography: '' }}
                validationSchema={authorSchema}
                onSubmit={handleAddAuthor}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="text" name="name" placeholder="Name" className="form-control black-input" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="date" name="birthDate" className="form-control black-input" />
                      <ErrorMessage name="birthDate" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <Field type="text" name="biography" placeholder="Biography" className="form-control black-input" />
                      <ErrorMessage name="biography" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={isSubmitting}>Add Author</button>
                  </Form>
                )}
              </Formik>
              <AuthorList authors={authors} onEdit={handleEditAuthor} onDelete={handleDeleteAuthor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
