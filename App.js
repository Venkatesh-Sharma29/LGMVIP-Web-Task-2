import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import UserGrid from './components/UserGrid';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #2f2347;
  }
`;
const LoadingCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
      {isLoading ? (
        <LoadingCircle>
          <div className="loader" />
        </LoadingCircle>
      ) : (
        <UserGrid users={users} />
      )}
    </>
  );
};

export default App;
