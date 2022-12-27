import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general',
    totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    totalResults: PropTypes.number
  }

  capitalizeFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page : 1,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstChar(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }

   fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
    this.props.setProgress(100);
  };

  render() {
    return (
      <div className='container my-3'>
      <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstChar(this.props.category)} Headlines</h1>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          { this.state.articles.map((e) => {
            return <div className="col-md-4" key={e.url}>
            <NewsItem title={e.title?e.title.slice(0, 40):""} description = {e.description?e.description.slice(0, 88):""} 
            imageURL= {e.urlToImage} newsURL={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
            </div>
          })}
          </div>
        </div>
        {console.log(this.state.articles.length, this.state.totalResults)}
        </InfiniteScroll>
      </div>
    )
  }
}

export default News