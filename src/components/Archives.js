import { Grid2 } from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/Archives.css'

function Archives () {
return (
    <>
    <h2>word calendar</h2>
    <Grid2 container className='calendarContainer'>
    <Calendar />
    </Grid2>
    </>
)
}

export default Archives;