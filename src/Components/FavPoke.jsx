import React from 'react'
import LikePoke from './LikePoke'

function FavPoke(props) {
  const {favValue} = props
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      {favValue?.map((data, idx) => (
        <div key = {idx}>
            <h3>{data.name}</h3>
            <img style = {{margin: '0 auto'}} src={data?.sprites?.front_default} alt='' />
            <LikePoke/>
        </div>
      ))}
    </div>
  )
}

// function FavPoke({favValue}) {

export default FavPoke
