import React from 'react'
import { HeroSection, MovieList } from '../components'
import GetCategories from '../api/get-categoy'

const Home: React.FC = () => {
  const { data } = GetCategories()
  const continueWatching = JSON.parse(localStorage.getItem('continueWatching') || '[]');

  return (
    <>
      <HeroSection />

      {continueWatching.length > 0 && (
        <MovieList
          title="Continue Assistindo"
          categoryId="4"
          data={continueWatching}
        />
      )}


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