import React from 'react'
import LapResetButton from './buttons/LapResetButton';
import StartStopButton from './buttons/StartStopButton';
import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'lodash/debounce.js';
import 'bootstrap/dist/css/centered-components.css';



export default function StopWatch() {
    // SETUP OVERALL BACKGROUND STYLE
    const lightModeBackground = {
        fontFamily: 'Tahoma',
        fontSize: '100px',
        fontWeight: 'bold',
        maxWidth: '100vw',
        backgroundColor: '',
        color: '#000000',
        outline: 'none',

    }

    // SETUP PANEL STYLE
    const stopWatchPanel = {
        fontSize: '2vw',
        borderRadius: '50px',
        padding: '2vh',
        backgroundColor: 'rgba(150, 223, 178, 1)',
        border: 'none',
        outline: 'none',
    }

    const currentMode = lightModeBackground;

    // DETERMINES WHETHER WE ARE IN LAP MODE (START) OR RESET MODE (STOP)
    const [lapReset, setLapReset] = useState(false);

    // HANDLE FUNCTION PROP TO PASS TO StartStopButton TO UPDATE lapReset MODE
    const handleStartStop = (lapReset: boolean) => {
        setLapReset(lapReset);
    };

    const [diff, setDiff] = useState(0);

    const [startTime, setStartTime] = useState(null);

    const [currInterval, setCurrInterval] = useState(null);

    // USING useEffect HOOK AND setInterval FUNCTION TO CREATE TIMER 
    useEffect(() => {
        if (lapReset) {
            // SET OUR CURRENT START TIME TO THE CURRENT TIME EXCLUDING ALL ACCUMULATED TIME PASSED SO FAR
            const d = new Date();
            setStartTime(d.getTime() - diff);

            // SET OUR CURRENT INTERVAL TO THE CURRENT TIME MINUS THE MOST RECENT START TIME
            setCurrInterval(setInterval(() => {
                const d = new Date();
                setDiff(d.getTime() - startTime);
            },
                10) // USE 10 FOR QUICK INTERVALS
            );
        }

        // RESET FUNCTION TO CLEAR INTERVAL
        return () => {
            clearInterval(currInterval);
        };
    }, [lapReset, startTime, diff]);

    // CALCULATE HOURS, MINUTES, SECONDS, AND MILLISECONDS TO DISPLAY (USING EXTRA LEADING 0'S WHEN NEEDED TO MAINTAIN DIGIT CONSISTENCY)
    const hr = (Math.floor(diff / (1000 * 60 * 60)) < 10) ? ("0" + Math.floor(diff / (1000 * 60 * 60))) : (Math.floor(diff / (1000 * 60 * 60)));
    const min = (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) < 10) ? ("0" + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))) : (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const sec = (Math.floor((diff % (1000 * 60)) / 1000) < 10) ? ("0" + Math.floor((diff % (1000 * 60)) / 1000)) : (Math.floor((diff % (1000 * 60)) / 1000));
    const milli = (diff % 1000 < 10) ? (("00" + (diff % 1000))) : ((diff % 1000 < 100)) ? (("0" + (diff % 1000))) : ((((diff % 1000))));

    // laps CARRIES THE LAPS IN STRING FORMAT
    const [laps, setLaps] = useState<string[]>([]);
    // lapsRaw CARRIES THE LAPS IN RAW NUMBER FORMAT (MILLISECONDS)
    const [lapsRaw, setLapsRaw] = useState<number[]>([]);

    // COLLECT THE CURRENT INDEX AND VALUE OF THE MINIMUM AND MAXIMUM LAP TIMES (TO HELP HIGHLIGHT GREEN, RED, OR NEITHER)
    const [maxLapDiff, setMaxLapDiff] = useState(0);
    const [maxLapDiffIndex, setMaxLapDiffIndex] = useState(0);

    const [minLapDiff, setMinLapDiff] = useState(0);
    const [minLapDiffIndex, setMinLapDiffIndex] = useState(0);

    // HANDLE RESET FUNCTION PROP PASSED TO LapResetButton
    const handleReset = (resetMode: boolean) => {

        // IF resetMode IS TRUE, WE ARE RUNNING THE STOPWATCH AND THE "LAP" BUTTON HAS BEEN PRESSED
        if (resetMode) {
            // UPDATE lapsRaw TO CONTAIN THE NEW ELAPSED TIME TO DISPLAY
            setLapsRaw(prevLapsRaw => [...prevLapsRaw, diff]);

            // IF WE CAN MAKE A COMPARISON TO A PRIOR LAP TIME (MIN OR MAX), THEN WE WILL
            if (lapsRaw.length >= 1) {
                // THE CURRENT LAP TIME IS THE TOTAL TIME PASSED SO FAR, WITH THE PREVIOUS LAP TIME REMOVED FROM IT
                const lapDiff = diff - lapsRaw[lapsRaw.length - 1]

                // SAME STRATEGY AS BEFORE TO CALCULATE VISUAL STRING LABELS FOR LAPS
                const compareHr = (Math.floor(lapDiff / (1000 * 60 * 60)) < 10) ? ("0" + Math.floor(lapDiff / (1000 * 60 * 60))) : (Math.floor(lapDiff / (1000 * 60 * 60)));
                const compareMin = (Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60)) < 10) ? ("0" + Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60))) : (Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60)));
                const compareSec = (Math.floor((lapDiff % (1000 * 60)) / 1000) < 10) ? ("0" + Math.floor((lapDiff % (1000 * 60)) / 1000)) : (Math.floor((lapDiff % (1000 * 60)) / 1000));
                const compareMilli = (lapDiff % 1000 < 10) ? (("00" + (lapDiff % 1000))) : ((lapDiff % 1000 < 100)) ? (("0" + (lapDiff % 1000))) : ((((lapDiff % 1000))));

                // IF IT IS THE MAX/MIN, WE LET THE CURRENT INDEX IN THE LIST BE THE INDEX WE MUST COLOR RED/GREEN RESPECTIVELY
                if (lapDiff >= maxLapDiff) {
                    setMaxLapDiff(lapDiff)
                    setMaxLapDiffIndex(lapsRaw.length)
                } else if (lapDiff <= minLapDiff) {
                    setMinLapDiff(lapDiff)
                    setMinLapDiffIndex(lapsRaw.length)
                }



                // ADD THE NEW STRING LABEL TO OUR LIST TO DISPLAY USING BOOTSTRAP LISTGROUP
                setLaps(prevLaps => [...prevLaps, compareHr + ':' + compareMin + ":" + compareSec + "." + compareMilli]);
            } else {
                // OTHERWISE, IT IS THE FIRST ELEMENT AND IS THE MIN AND MAX
                setMinLapDiff(diff);
                setMaxLapDiff(diff);

                // ADD THE NEW STRING LABEL TO OUR LIST TO DISPLAY USING BOOTSTRAP LISTGROUP
                setLaps(prevLaps => [...prevLaps, hr + ':' + min + ":" + sec + "." + milli]);
            }

        } else {
            // OTHERWISE, THE RESET BUTTON HAS BEEN CLICKED
            // THUS, WE NEED TO RESET ALL OUR LISTS AS THEY WERE AT THE START OF THE CODE UPON RUNNING SCRIPT
            // EVERYTHING MUST GO BACK TO INITIAL VALUES
            setStartTime(null);
            setDiff(0);
            setLaps([]);
            setLapsRaw([]);

            setMaxLapDiff(Number.MIN_SAFE_INTEGER);
            setMaxLapDiffIndex(0);

            setMinLapDiff(Number.MAX_SAFE_INTEGER);
            setMinLapDiffIndex(0);
        }


    }

    return (
        <div>
            <div className="container text-center" style={stopWatchPanel}>
                <h1 style={{ fontSize: '7.5vw', fontWeight: 'bold', padding: '20px' }}>
                    {hr}:{min}:{sec}.{milli}
                </h1>

                <div className="row justify-content-center" style={{}}>
                    <div className="container" style={{ width: '1px' }}></div>
                    <LapResetButton lapReset={lapReset} setReset={handleReset}></LapResetButton>
                    <div className="container" style={{ width: '1px' }}></div>
                    <StartStopButton setLapResetButtonType={handleStartStop} ></StartStopButton>
                    <div className="container" style={{ width: '1px' }}></div>
                </div>
                <div className="col" style={{ height: '5vh', paddingTop: '6vh', paddingBottom: '3vh', backgroundColor: '' }}>
                    <div className="container" style={{ maxWidth: '50vw', height: '3px', padding: '', backgroundColor: 'grey', borderRadius: '20px' }}></div>
                </div>
            </div>
            <div className="container" style={{ height: "2vh" }}></div>
            <div className="container ml-auto" style={{ backgroundColor: '' }}>
                <ul className="list-group" style={{ background: 'transparent', borderColor: 'transparent', height: '', flexDirection: 'column-reverse' }}>
                    {laps.map((lap, index) =>
                        <li className="list-group-item"
                            key={lap}
                            onClick={() => console.log(lap)}
                            // IN-IF STATEMENT TO DETERMINE IF WE SHOULD INDICATE A MAX/MIN USING RED/GREEN HIGHLIGHT RESPECTIVELY
                            style={{ borderRadius: '50px', background: '', borderColor: 'transparent', height: '10vh', fontSize: '50px', backgroundColor: (laps.length < 2) ? ('transparent') : (index == maxLapDiffIndex) ? ('red') : (index == minLapDiffIndex) ? ('green') : 'transparent' }}
                        >
                            Lap {index + 1}: {lap}
                        </li>)}
                </ul>
            </div>



        </div>
    )
}