import React from 'react';
import { useState } from "react";

interface LapResetButtonProps {
    lapReset: boolean;
    setReset: (reset: boolean) => void;
}

export default function LapResetButton({ lapReset, setReset }: LapResetButtonProps) {
    const buttonStyleReset = {
        fontSize: '2vw',
        borderRadius: '50px',
        padding: '20px 20px',
        width: '10vw',
        backgroundColor: '#999999',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const buttonStyleLap = {
        fontSize: '2vw',
        borderRadius: '50px',
        padding: '20px 20px',
        width: '10vw',
        backgroundColor: '#7F7F7F',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    };

    const lapText = "Lap";
    const resetText = "Reset";

    const currentStyle = lapReset ? buttonStyleLap : buttonStyleReset;
    const currentText = lapReset ? lapText : resetText;

    const [resetState, setResetState] = useState(false);

    const toggleStyle = () => {
        setResetState((prevResetState) => !prevResetState);

        setReset(resetState);
    };

    return (
        <button
            style={currentStyle}
            onClick={toggleStyle}
        >
            {currentText}
        </button>
    );
}