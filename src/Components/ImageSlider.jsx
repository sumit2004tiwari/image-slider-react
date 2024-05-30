import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

function ImageSlider() {
  const apiUrl = "https://picsum.photos/v2/list";
  const [storeData, setStoreData] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);


  const handleLeft = ()=>{
    setCurrentImage(currentImage == 0   ? storeData.length -1 : currentImage - 1  )
  }

  const handleRight = ()=>{
    setCurrentImage(currentImage == storeData.length-1 ? 0 : currentImage + 1)
  }
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(apiUrl);
      const myData = await result.json();
      console.log(myData);
      setStoreData(myData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handleLeft}/>
        {storeData && storeData.length
          ? storeData.map((data , index) => {
              return (
                <img
                  src={data.download_url}
                  alt="loading"
                  key={data.id}
                  width={300}
                  className= {currentImage === index ?  "current-img":  "current-img-hide"}
                />
              );
            })
          : null}
        <BsArrowRightCircleFill className=" arrow arrow-right" onClick={handleRight} />

        <span className="circle-indicator">
          {storeData && storeData.length
            ? storeData.map((_, index) => (
                <button key={index}
                className={currentImage === index ? "current-indicator" : "current-indicator-gray"}></button>
              ))
            : null}
        </span>
      </div>
    </>
  );
}

export default ImageSlider;
