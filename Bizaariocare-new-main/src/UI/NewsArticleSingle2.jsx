import React from 'react'
import { useParams } from 'react-router';

const NewsArticleSingle2 = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
      single
    </div>
  )
}

export default NewsArticleSingle2
