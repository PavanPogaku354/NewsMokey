import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News  from './components/News'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App =  ()=>{
 const  apikey= import.meta.env.VITE_API_KEY;  // For Vite
  const [progress, setProgress] = useState(0);
 const pageSize = 6 ;
  
  
  
    
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route path="/entertainment" element={<News apikey={apikey}  setProgress={setProgress} pageSize={pageSize} category="entertainment" />} />
            <Route path="/" element={<News apikey={apikey}  setProgress={setProgress} key="general" pageSize={pageSize} category="general" />} />
            <Route path="/health" element={<News apikey={apikey}  setProgress={setProgress} key="health" pageSize={pageSize} category="health" />} />
            <Route path="/sports" element={<News apikey={apikey}  setProgress={setProgress} key="sports" pageSize={pageSize} category="sports" />} />
            <Route path="/science" element={<News apikey={apikey}  setProgress={setProgress} key="science" pageSize={pageSize} category="science" />} />
            <Route path="/technology" element={<News apikey={apikey}  setProgress={setProgress} key="technology" pageSize={pageSize} category="technology" />} />
            <Route path="/business" element={<News apikey={apikey}  setProgress={setProgress} key="business" pageSize={pageSize} category="business" />} />
          </Routes>
        </Router>
      </>
    );
  }



export default App