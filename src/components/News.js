import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setLoading(false);
    settotalResults(parsedData.totalResults);
    
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstChar(props.category)} - NewsMonkey`
    updateNews();
  }, [])
  

   const fetchMoreData = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

    return (
      <div className='container my-3'>
      <h1 className='text-center my-5'>NewsMonkey - Top {capitalizeFirstChar(props.category)} Headlines</h1>
      {loading && <Spinner/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { articles.map((e) => {
            return <div className="col-md-4" key={e.url}>
            <NewsItem title={e.title?e.title.slice(0, 40):""} description = {e.description?e.description.slice(0, 88):""} 
            imageURL= {e.urlToImage} newsURL={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
            </div>
          })}
          </div>
        </div>
        </InfiniteScroll>
      </div>
    )
}


News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general',
  totalResults: 0
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  totalResults: PropTypes.number
}

export default News