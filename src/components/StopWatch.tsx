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
    const milli = (diff % 1000 < 10) ? (("00" + (diff % 1000))) : ((diff % 1000 < 100)) ? (("0" + (diff % 1000))) : ((((diff % 1000))));

    const [laps, setLaps] = useState<string[]>([]);
    const [lapsRaw, setLapsRaw] = useState<number[]>([]);

    const [maxLapDiff, setMaxLapDiff] = useState(0);
    const [maxLapDiffIndex, setMaxLapDiffIndex] = useState(0);

    const [minLapDiff, setMinLapDiff] = useState(0);
    const [minLapDiffIndex, setMinLapDiffIndex] = useState(0);

    const handleReset = (resetMode: boolean) => {

        if (resetMode) {
            setLapsRaw(prevLapsRaw => [...prevLapsRaw, diff]);

            if (lapsRaw.length >= 1) {
                const lapDiff = diff - lapsRaw[lapsRaw.length - 1]

                const compareHr = (Math.floor(lapDiff / (1000 * 60 * 60)) < 10) ? ("0" + Math.floor(lapDiff / (1000 * 60 * 60))) : (Math.floor(lapDiff / (1000 * 60 * 60)));
                const compareMin = (Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60)) < 10) ? ("0" + Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60))) : (Math.floor((lapDiff % (1000 * 60 * 60)) / (1000 * 60)));
                const compareSec = (Math.floor((lapDiff % (1000 * 60)) / 1000) < 10) ? ("0" + Math.floor((lapDiff % (1000 * 60)) / 1000)) : (Math.floor((lapDiff % (1000 * 60)) / 1000));
                const compareMilli = (lapDiff % 1000 < 10) ? (("00" + (lapDiff % 1000))) : ((lapDiff % 1000 < 100)) ? (("0" + (lapDiff % 1000))) : ((((lapDiff % 1000))));

                if (lapDiff >= maxLapDiff) {
                    setMaxLapDiff(lapDiff)
                    setMaxLapDiffIndex(lapsRaw.length)
                    console.log("NEW MAX: ", maxLapDiffIndex)
                } else if (lapDiff <= minLapDiff) {
                    setMinLapDiff(lapDiff)
                    setMinLapDiffIndex(lapsRaw.length)
                    console.log("NEW MIN: ", maxLapDiffIndex)
                }




                setLaps(prevLaps => [...prevLaps, compareHr + ':' + compareMin + ":" + compareSec + "." + compareMilli]);
            } else {
                setMinLapDiff(diff);
                setMaxLapDiff(diff);
                setLaps(prevLaps => [...prevLaps, hr + ':' + min + ":" + sec + "." + milli]);
            }

        } else {
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
    // laps.reverse()

    return (
        <div className="container text-center" style={currentMode}>
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
            <ul className="list-group" style={{ background: '', borderColor: '', height: '', flexDirection: 'column-reverse' }}>
                {laps.map((lap, index) =>
                    <li className="list-group-item"
                        key={lap}
                        onClick={() => console.log(lap)}
                        style={{ background: '', borderColor: 'rgba(150, 191, 72, 0.4)', borderBlockEndColor: '', height: '10vh', fontSize: '50px', backgroundColor: (laps.length < 2) ? ('transparent') : (index == maxLapDiffIndex) ? ('red') : (index == minLapDiffIndex) ? ('green') : 'transparent' }}
                    >
                        Lap {index + 1}: {lap}
                    </li>)}
            </ul>


        </div>
    )
}