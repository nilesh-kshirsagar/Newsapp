import React,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
 const [articles,setarticles]= useState([])
 const [loading,setloading]= useState(true)
 const [page,setpage]= useState(1)
 const [totalResults,settotalResults]= useState(0)

 const capitalizefirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
  
 const updatenews= async ()=>{
    props.setprogress(10)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    
    setloading(true)
    let data=await fetch(url)
    props.setprogress(30)
    let parseddata=await data.json()
    props.setprogress(70)
    setarticles(parseddata.articles)
    settotalResults(parseddata.totalResults)
    setloading(false)
    
    props.setprogress(100)
  }
  useEffect(()=>{
     document.title=`${capitalizefirstletter(props.category)}-newsmonkey`
    updatenews()
  },[])
 
 
 const fetchMoreData =async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
  setpage(page+1)
    let data=await fetch(url)
    let parseddata=await data.json()
   setarticles(articles.concat(parseddata.articles))
   settotalResults(parseddata.totalResults)
    
  };
 
    return (
      <>
      <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>newsmonkey-top headline from {capitalizefirstletter(props.category)} </h1>
      {loading && <Spinner/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        
       <div className="row">
       { articles.map((element)=>{
       return <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
       })}
       
       
       </div>
       </div>
       </InfiniteScroll>
       
      </>
    )
  
}
News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
} 
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
} 
export default News
