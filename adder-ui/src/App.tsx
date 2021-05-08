import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import axios from 'axios';


function App() {
  const { register, watch, handleSubmit, setValue } = useForm({ mode: 'all' });
  const firstRef = register('first', { required: true });
  const secondRef = register('second', { required: true });
  const [result, setResult] = useState<number>();

  const api = axios.create({
    baseURL: "http://localhost:8080/math",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const onSubmit = useCallback((data) => {
    const { first, second } = data;
    api.get('/add/' + first + '/' + second).then(resp => {
      setResult(resp.data)
    })
    console.log(data);
  }, [api]);

  return (
    <div className='container'>
      <form id="add" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="first" className="form-label">First value</label>
          <input type="number" required ref={firstRef.ref} className="form-control" id="first" placeholder="First value" onChange={e => setValue("first", e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="second" className="form-label">Second value</label>
          <input type="number" required ref={secondRef.ref} className="form-control" id="second" placeholder="Second value" onChange={e => setValue("second", e.target.value)} />
        </div>
        <div className="mb-3">
          <Button type='submit'>Sum</Button>
        </div>

        {result && (
          <div className="mb-3">{result}</div>
        )}
      </form>
    </div>
  );
}

export default App;
