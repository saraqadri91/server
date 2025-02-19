import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import '../App.css'; 

// Simple validation function for the form
const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  
  // Create a function to handle the login (the API call)
  const loginUser = async (values) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      email: values.email,
      password: values.password,
    });
  
    return response.data; // return the API response
  };
  
  const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
  
    // Define the mutation using React Query's useMutation hook
    const mutation = useMutation({
      mutationFn: loginUser,  // The function that performs the POST request
      onMutate: () => {
        // You can handle the mutation state before it completes (e.g., show loading spinner)
        setErrorMessage('');
      },
      onSuccess: (data) => {
        // Handle success (e.g., show success message or navigate to another page)
        console.log('Form Submitted Successfully:', data);
        alert('Login Successful!');
      },
      onError: (error) => {
        // Handle error (e.g., show error message)
        console.error('There was an error submitting the form:', error);
        setErrorMessage('Login Failed! Please try again.');
      },
    });
  
    return (
      <div className="form-container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validate}
          onSubmit={(values) => {
            // Trigger the mutation when the form is submitted
            mutation.mutate(values);
          }}
        >
          {() => (
            <div className="form">
              <h2>Login</h2>
              {mutation.isLoading && <div className="loading">Loading...</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              
              <Form>
                <div>
                  <label htmlFor="email">Email: </label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <div>
                  <button type="submit" disabled={mutation.isLoading}>Submit</button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    );
  };
  
  export default LoginForm;bvfx 