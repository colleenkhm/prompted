import { Grid2 } from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Archives.css'

function Archives () {
    // const [pastWords, setPastWords] = useState({
    //     // Format: 'YYYY-MM-DD': 'word'
    //     '2025-02-20': 'ephemeral',
    //     '2025-02-21': 'serendipity',
    //     '2025-02-22': 'mellifluous',
    //     '2025-02-23': 'peculiar',
    //     '2025-02-24': 'zealous'
    //   });
    
    const pastWords = [
        {'2025-02-20': 'ephemeral'},
        {'2025-02-21': 'serendipity'},
        {'2025-02-22': 'loquacious'},
        {'2025-02-23': 'peculiar'},
        {'2025-02-24': 'zealot'}
    ]

    const findWordForDate = (dateStr) => {
        // Look through the array of objects to find a matching date
        for (const wordObj of pastWords) {
          if (wordObj[dateStr]) {
            return wordObj[dateStr];
          }
        }
        return null;
      };
    
      // Custom tile content to show the word of the day
      const tileContent = ({ date, view }) => {
        if (view !== 'month') return null;
        
        // Format the date as YYYY-MM-DD
        const dateStr = date.toISOString().split('T')[0];

        const word = findWordForDate(dateStr);
        
        // Check if we have a word for this date
        if (word) {
            return <p className="daily-word">{word}</p>;
          }
        return null;
      };
return (
    <>
    <h2>word calendar</h2>
    <Grid2 container className='calendarContainer'>
    <Calendar
    tileContent={tileContent} />
    </Grid2>
    </>
)
}

export default Archives;