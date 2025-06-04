import React from 'react'
import { HeroSection, MovieList } from '../components'
import GetCategories from '../api/get-categoy'

const Home: React.FC = () => {
  const { data } = GetCategories()
  return (
    <>
      <HeroSection />
      {data.length > 0 && data.map((item, index) => (
        <MovieList
          key={index}
          title={item.title}
          categoryId={item.id}
        />
      ))}
    </>
  )
}


export default Home