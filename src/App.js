import React from 'react';
import './App.css';
import AddUser from './components/AddUser';
import TransactionsTable from './components/TransactionsTable';
import UserTable from './components/UserTable';
import {BASE_URL} from "./utils";
import axios from 'axios';
import AddTransaction from './components/AddTransaction';

function App() {
  const [users, setUsers] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
    React.useEffect(function() {
        async function getUsersAndTransactions() {
            const resp1 = await axios.get(`${BASE_URL}/user`);
            setUsers(resp1.data);
            const {data} = await axios.get(`${BASE_URL}/transaction`);
            setTransactions(data);
        }

        const interval = setInterval(() => getUsersAndTransactions(), 5000);
        return () => clearInterval(interval);
    }, []);


  return (
    <div className="App">

      <AddUser />
      <AddTransaction users={users} transactions={transactions}/>
      <div className="table-container">
        <TransactionsTable transactions={transactions}/>
        <UserTable users={users}/>
      </div>
      
    </div>
  );
}

export default App;
