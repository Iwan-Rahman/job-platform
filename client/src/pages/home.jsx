import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
  return <div>
      <h1>JobsForAll!</h1>
      <div className='home'>
        <h2>Tables</h2>
        <ul>
          <li><a href='./users'>Users</a></li>
          <li><a href='./companies'>Companies</a></li>
          <li><a href='./jobs'>Jobs</a></li>
          <li><a href='./apps'>Applications</a></li>
        </ul>
      </div>  
  </div>;
}
export default Home