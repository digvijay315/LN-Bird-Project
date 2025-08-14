import React from 'react'
import videoFile from '../../assets/video2.mp4'
import poster from '../../assets/poster.png'
const LiveSessionContent = () => {
  return (
      <>
          <div className='live-session'>
                <video   controls="controls" autoplay="false"  width={'100%'} poster={poster} >
                              <source src={videoFile} type="video/mp4"/>
                          </video>
        </div>
      </>
  )
}

export default LiveSessionContent