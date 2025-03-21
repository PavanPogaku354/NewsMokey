import React, { Component } from 'react'
import PropTypes, { element } from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

 static defaultProps = {
country  : "us",
pageSize :"8",
category : "sports"
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    cateogery : PropTypes.string
    
  }
  
  
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page :1,
      totalResults:0
    }
    document.title = `${this.props.category} -NewsMonkey`;
  }
  

  updateNews = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b85e586dd87d47948fef9cd36089b16f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      loading : false,
      totalResults:parsedData.totalResults
    })
  }
  async componentDidMount(){
    this.updateNews();

  }

  handleNextClick = async ()=>{
    this.setState({page:this.state.page + 1});
   this.updateNews();
  }


  handlePrevClick = async ()=>{
    this.setState({page:this.state.page - 1});
    this.updateNews();
   }
   fetchData= async ()=>{
    this.setState({page : this.state.page +1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b85e586dd87d47948fef9cd36089b16f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults
    })
 }

 
  render() {
    
    return (
      <>
       {this.state.loading &&  <Spinner/>}

        <InfiniteScroll
  dataLength={this.state.articles.length} //This is important field to render the next data
  next={this.fetchData}
  hasMore={this.state.articles.length !== this.state.totalResults}
  loader={<Spinner/>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
    
    <div className="container my-5" >
          <div className="row" >
             { this.state.articles.map((ele, index) => {
              return (
                <div className="col-md-4 mb-4" key={ele.url}>
                  <NewsItem title={ele.title} desc={ele.description} imgurl={ele.urlToImage} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>
              );
            })}
          </div>
         </div>
          </InfiniteScroll>
        </>
        
      
    );
    
  }
}
