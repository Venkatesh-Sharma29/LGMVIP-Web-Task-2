import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import UserGrid from './components/UserGrid';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #2f2347;
  }
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar onGetUsers={getUsers} />
      {isLoading ? <p>Loading...</p> : <UserGrid users={users} />}
    </>
  );
};

export default App;
