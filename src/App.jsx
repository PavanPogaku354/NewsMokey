import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apikey = import.meta.env.VITE_API_KEY; // For Vite
  const [progress, setProgress] = useState(0);
  const pageSize = 6;
  const country ="us" ;
  

  // Debug: Check if the API key is loaded
  console.log("API Key:", apikey);

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
          <Route
            exact
            path="/entertainment"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="entertainment"
                key="entertainment" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="general"
                key="general" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="health"
                key="health" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="sports"
                key="sports" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="science"
                key="science" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="technology"
                key="technology" // Add key to force re-render
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                apikey={apikey} country={country}
                setProgress={setProgress}
                pageSize={pageSize}
                category="business"
                key="business" // Add key to force re-render
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;