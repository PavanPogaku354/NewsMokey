import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News  from './components/News'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey= import.meta.env.VITE_API_KEY;  // For Vite

  pageSize = 6 ;
  state={
    progress : 0
  }
  setProgress=(progress)=>{
this.setState({progress:progress})
  }
  render() {
    
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
        color="#f11946"
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
          <Routes>
            <Route path="/entertainment" element={<News apikey={this.apikey} setProgress={this.setProgress} pageSize={this.pageSize} category="entertainment" />} />
            <Route path="/" element={<News apikey={this.apikey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" />} />
            <Route path="/health" element={<News apikey={this.apikey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" />} />
            <Route path="/sports" element={<News apikey={this.apikey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" />} />
            <Route path="/science" element={<News apikey={this.apikey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" />} />
            <Route path="/technology" element={<News apikey={this.apikey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" />} />
            <Route path="/business" element={<News apikey={this.apikey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" />} />
          </Routes>
        </Router>
      </>
    );
  }
}


