import React, { useEffect, useState } from 'react';
import './App.css';
import { getList } from './services/list';

function App() {
  const [itemInput, setItemInput] = useState( {
    name: '',
    email: '',
    password: '',
    isAdmin: ''
});
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
      return () => mounted = false;
  }, [])

  return (
    <div className="wrapper">
      <h1>Loan List</h1>
      <ul>
        {list.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
      <form>
        <label>Name</label>
        <input type="text" />

        <label>Email</label>
        <input type="text" />

        <label>Password</label>
        <input type="text" />

        <label>User Type</label>
        <input type="text" />

        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App;
