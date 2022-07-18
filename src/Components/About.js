import React from 'react';

export const About = (props) => {
  return (
    <div className='container' style={{position:'absolute', top: '35%', left: '8%'}}>
        <h2 style={{color: props.mode === 'dark'?'white':'black'}}>Hello Guys, I am your friend Rishabh Jain and I would like to inform you that there is no need to have a copy and pen everytime to check your daily work list or notes. Here you can create your notes and to-do lost.</h2>
    </div>
  )
}
