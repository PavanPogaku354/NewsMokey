import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Set document title and fetch news on component mount
  useEffect(() => {
    document.title = `${props.category} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch news articles from the API
  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    console.log("Fetching URL:", url); // Debug the URL
    setLoading(true);
    props.setProgress(10);
    try {
      const data = await fetch(url);
      props.setProgress(40);
      const parsedData = await data.json();
      console.log("Parsed Data:", parsedData); // Debug the parsed data
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching news: ", error); // Log any errors
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  // Fetch more news articles for infinite scroll
  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news: ", error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container my-5">
          <div className="row">
            {articles.map((ele) => (
              <div className="col-md-4 mb-4" key={ele.url}>
                <NewsItem
                  title={ele.title}
                  desc={ele.description}
                  imgurl={ele.urlToImage}
                  url={ele.url}
                  author={ele.author}
                  date={ele.publishedAt}
                  source={ele.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// Default props for the News component
News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

// Prop types for the News component
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;