import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {

  const [jobs, setJobs] = useState([]);
  const [jobsStored, setJobsStored] = useState([]);
  const [pages, setPages] = useState([1, 2, 3, null, 10]);

  useEffect(() => {
    getJobs();
  }, [])

  const getJobs = () => {
    fetch('https://remotive.com/api/remote-jobs')
      .then(request => request.json())
      .then(data => {
        setJobs(data.jobs);
        setJobsStored(data.jobs);
      });
  }

  return (
    <div className="App">    
      {
        jobs.length <= 0 ? <div className="spinner"></div> : (
          <>
            <Header jobs={jobs} setJobs={setJobs} jobsStored={jobsStored} setPages={setPages}/>
            <Main jobs={jobs} pages={pages} setPages={setPages}/>
          </>          
        )
      } 
    </div>
  )
}

export default App
