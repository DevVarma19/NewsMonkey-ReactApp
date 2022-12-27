import React from 'react'

const NewsItem = (props) => {

    let {title, description, imageURL, newsURL, author, date, source} = props;
    return (
      <div className='my-4'>
        <div className="card" style={{width: "18rem"}}>
          <img src={imageURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="position-absolute top-0 traslate-middle badge rounded-pill text-bg-danger"
            style={{left: '90%', zIndex:'1'}}>{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem