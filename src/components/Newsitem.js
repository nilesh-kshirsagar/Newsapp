import React from 'react'

const Newsitem =(props)=> {

 
    let { title, description, imageurl, newsurl, author, date, source } = props
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>

            <span className=" badge rounded-pill bg-danger" >
              {source}

            </span>
          </div>
          <img src={!imageurl ? "https://images.indianexpress.com/2022/08/Cry-from-baby-star-20220831.jpg" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">by {!author ? 'unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsurl} target="_blank" className="btn btn-sm btn-dark">read more</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
