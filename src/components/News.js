import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstChar(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    })
  }

  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async() => {
    await this.setState({
      page : this.state.page - 1
    })
    this.updateNews()
  }

  handleNextClick = async() => {
    await this.setState({
      page : this.state.page + 1
    })
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
      <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstChar(this.props.category)} Headlines</h1>
      {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((e) => {
          return <div className="col-md-4" key={e.url}>
          <NewsItem title={e.title?e.title.slice(0, 40):""} description = {e.description?e.description.slice(0, 88):""} 
          imageURL= {e.urlToImage} newsURL={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr;Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News