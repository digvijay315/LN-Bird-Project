import React from 'react'
import { cardsData } from '../../Data/LocalData'
import NewsArticleSingle from '../../UI/NewsArticleSingle'

const NewsArticleList = () => {
  return (
    <>
        {cardsData.map((articleData) => (
          <NewsArticleSingle 
            id={articleData.id}
            img={articleData?.img}
            title={articleData?.title}
            desc={articleData?.desc}
            article={articleData}
             />
            ))} 
    </>
  )
}

export default NewsArticleList
