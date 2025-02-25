import React from 'react';
import useDailyWord from '../utils/useDailyWord';
import { Button } from '@mui/material';
import '../styles/Home.css';

function Home() {
  const { dailyWord, loading, error } = useDailyWord();
  
  return (
    <div className="home-content">
        
        {loading && <p>Loading today's word...</p>}
        
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && dailyWord && dailyWord.word ? (
          <div className="word-card">
            <h1 className="word">{dailyWord.word}</h1>
            
            {dailyWord.allDefinitions && dailyWord.allDefinitions.length > 0 ? (
              <div className="word-details">
                {dailyWord.allDefinitions.map((def, index) => (
                  <div key={index} className="definition-item">
                    <p className="part-of-speech">
                      <em>{def.partOfSpeech}</em>
                    </p>
                    <p className="definition">
                      <strong>{index + 1}.</strong> {def.definition}
                    </p>
                    
                    {def.example && (
                      <p className="example">
                        <em>Example:</em> "{def.example}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No definitions found.</p>
            )}
          </div>
        ) : (
          !loading && !error && <p>Could not load today's word.</p>
        )}
        <Button 
  sx={{ 
    fontFamily: 'inherit',
    color: '#333',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    marginTop: '1rem',
    fontSize: '1rem',
    textTransform: 'none',
  }}
>
  {`let's create :)`}
</Button>
      </div>
  );
}

export default Home;