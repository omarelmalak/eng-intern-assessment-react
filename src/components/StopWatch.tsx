import React from 'react'
import LapResetButton from './buttons/LapResetButton';
import StartStopButton from './buttons/StartStopButton';
import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'lodash/debounce.js';
import 'bootstrap/dist/css/centered-components.css';



export default function StopWatch() {
    const lightModeBackground = {
        fontFamily: 'Tahoma',
        fontSize: '100px',
        fontWeight: 'bold',
        maxWidth: '80vw',
        // linear-gradient(to top, transparent, #9bce39, #87ceeb)
        backgroundColor: '',
        color: '#000000',
        outline: 'none',

    }

    const currentMode = lightModeBackground;

    const [lapReset, setLapReset] = useState(false);

    const handleStartStop = (lapReset: boolean) => {
        setLapReset(lapReset);
    };

    const [diff, setDiff] = useState(0);

    const [startTime, setStartTime] = useState(null);

    const [currInterval, setCurrInterval] = useState(null);

    const handleReset = (reset: boolean) => {
        setLapReset(false);
        setStartTime(null);
        setDiff(0);
    }

    useEffect(() => {
        if (lapReset) {
            setStartTime(Date.now() - diff);

            setCurrInterval(setInterval(() => {
                setDiff(Date.now() - startTime);
            },
                10)
            );
        }

        return () => {
            clearInterval(currInterval);
        };
    }, [lapReset, startTime, diff]);

    const hr = (Math.floor(diff / (1000 * 60 * 60)) < 10) ? ("0" + Math.floor(diff / (1000 * 60 * 60))) : (Math.floor(diff / (1000 * 60 * 60)));
    const min = (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) < 10) ? ("0" + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))) : (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const sec = (Math.floor((diff % (1000 * 60)) / 1000) < 10) ? ("0" + Math.floor((diff % (1000 * 60)) / 1000)) : (Math.floor((diff % (1000 * 60)) / 1000));
    const milli = (diff % 1000 < 10) ? (("00" + (diff % 1000))) : ((diff % 1000 < 100)) ? (("0" + (diff % 1000))) : ((((diff % 1000))))


    return (
        <div className="container text-center" style={currentMode}>
            <h1 style={{ fontSize: '100px', fontWeight: 'bold', padding: '20px' }}>
                {hr}:{min}:{sec}.{milli}
            </h1>

            <div className="row justify-content-center" style={{}}>
                <div className="container" style={{ width: '1px' }}></div>
                <LapResetButton lapReset={lapReset} setReset={handleReset}></LapResetButton>
                <div className="container" style={{ width: '1px' }}></div>
                <StartStopButton setLapResetButtonType={handleStartStop} ></StartStopButton>
                <div className="container" style={{ width: '1px' }}></div>
            </div>



        </div>
    )
}