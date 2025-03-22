import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = (props) => {
  const { title, desc, imgurl, url, author, date, source } = props;
  return (
    <div>
      <div className="card">
        <img
          src={imgurl ? imgurl : "https://www.investopedia.com/thmb/JGgfYNkvWThNPHHgGI_NuCtap7s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-2205033424-0357e12acdc84a90ae0241b9eea1ce98.jpg"}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "96%" }}>
            {source}
          </span>
          <h5 className="card-title">{title ? title.slice(0, 40) : " "}</h5>
          <p className="card-text">
            {desc ? desc.slice(0, 83) : "Unable to fetch this news..."}
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author} published at {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={url} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

// Prop types for the NewsItem component
NewsItem.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  imgurl: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
};

export default NewsItem;