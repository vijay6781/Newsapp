import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('all');
  const [bookmarks, setBookmarks] = useState([]);


  const bookmarkArticle = (article) => {
    console.log(article);
    if (!bookmarks.find((bookmark) => bookmark.url === article.url)) {
      setBookmarks([...bookmarks, article]);
    } else {
      alert("Hey, Already bookmarked");
    }
  };


  const showBookmarks = () => {
    // setMode("bookmarks");
    if(bookmarks.length>0){
      setMode("bookmarks");
    }
    else{
      alert("No bookmarked yet");
    }
  };


 


  const showAllNews =() => {
     setMode("all");
   
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=f7eee881034a4d129941fb34fe0698f4&q=news"
        )
        .then((response) => {
          console.log(response);
          console.log(mode)
          setData(response.data.articles);
          if(response.length==0){
            alert('try after some time');
          }
        });
   
  }


  // useEffect(() => {
  //   if (window.location.pathname === '/') {
  //     ShowAllNews();
  //   }
  // }, []);


  return (
    <>
      <div className="d-flex justify-content-center my-4">
       
          <button className="btn btn-info mx-4" onClick={showAllNews}>
           Show All News
          </button>
       
          <button className="btn btn-primary mx-4" onClick={showBookmarks}>
            Show bookmarks
          </button>
       
      </div>


      <div className="container d-flex justify-content-center">
        <div className="row">
          {data.map((value) => {
            return (
              mode === "all" && (
                <div className="col-3 mx-4 my-1">
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={
                        value.urlToImage ||
                        'https://i.ytimg.com/vi/wxOgCJLW1CU/maxresdefault_live.jpg'
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-info btn-sm d-flex justify-content-center"
                          onClick={() => bookmarkArticle(value)}
                        >
                          Bookmark
                        </button>
                      </div>
                      <p className="card-text">{value.description}</p>
                      <div className="d-flex justify-content-center">
                        <a href={value.url} className="btn btn-primary">
                          Know More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>


      <div className="container">
        <div className="row">
          {bookmarks.map((value) => {
            return (
              mode === "bookmarks" && (
                <div className="col-3 mx-4 my-1">
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={
                        value.urlToImage ||
                        'https://i.ytimg.com/vi/wxOgCJLW1CU/maxresdefault_live.jpg'
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>
                      <div className="d-flex justify-content-center">
                        {/* <button
                          className="btn btn-success mx-4"
                          onClick={() => bookmarkArticle(value)}
                        >
                          Bookmark
                        </button> */}
                      </div>
                      <p className="card-text">{value.description}</p>
                      <div className="d-flex justify-content-center">
                        <a href={value.url} className="btn btn-primary mx-4">
                          Know More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}


export default App;



