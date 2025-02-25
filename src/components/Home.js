import { Button } from '@mui/material';
import React from 'react';

function Home() {
  return (
    <main>
        <div id='word'></div>
        <div id='definition'></div>
        <div id='related-words'></div>
        <Button class='button' variant='text'>{`let's create :)`}</Button>
    </main>
  );
}

export default Home;