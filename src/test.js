import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './components/StopWatch';

test('StopWatch starts', () => {
    jest.useFakeTimers();

    const { getByText } = render(<StopWatch />);

    const startStopButton = getByText(/Start/i);

    expect(getByText('00:00:00.000')).toBeInTheDocument();

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(217, 83, 79)');

    act(() => {
        setTimeout(() => {
        }, 1000);
    });

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    expect(getByText('00:00:01.000')).toBeInTheDocument();

});


test('StopWatch stops', () => {
    jest.useFakeTimers();

    const { getByText } = render(<StopWatch />);

    const startStopButton = getByText(/Start/i);

    expect(getByText('00:00:00.000')).toBeInTheDocument();

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(217, 83, 79)');

    act(() => {
        setTimeout(() => {
        }, 1000);
    });

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(92, 184, 92)');

    expect(getByText('00:00:01.000')).toBeInTheDocument();


});

test('StopWatch resets', () => {
    jest.useFakeTimers();

    const { getByText } = render(<StopWatch />);

    const startStopButton = getByText(/Start/i);

    expect(getByText('00:00:00.000')).toBeInTheDocument();

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(217, 83, 79)');

    act(() => {
        setTimeout(() => {
        }, 1000);
    });

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(92, 184, 92)');

    expect(getByText('00:00:01.000')).toBeInTheDocument();

    const lapResetButton = getByText(/Reset/i);

    fireEvent.click(lapResetButton);

    expect(getByText('00:00:00.000')).toBeInTheDocument();

});


test('StopWatch records laps', () => {
    jest.useFakeTimers();

    const { getByText } = render(<StopWatch />);

    const startStopButton = getByText(/Start/i);

    expect(getByText('00:00:00.000')).toBeInTheDocument();

    fireEvent.click(startStopButton);

    expect(window.getComputedStyle(startStopButton).backgroundColor).toBe('rgb(217, 83, 79)');

    const lapResetButton = getByText(/Lap/i);

    expect(window.getComputedStyle(lapResetButton).backgroundColor).toBe('rgb(127, 127, 127)');

    act(() => {
        setTimeout(() => {
        }, 1000);
    });

    act(() => {
        jest.advanceTimersByTime(1000);
    });


    fireEvent.click(lapResetButton);


    act(() => {
        setTimeout(() => {
        }, 5000);
    });

    act(() => {
        jest.advanceTimersByTime(5000);
    });

    fireEvent.click(lapResetButton);

    act(() => {
        setTimeout(() => {
        }, 5000);
    });

    act(() => {
        jest.advanceTimersByTime(5000);
    });

    const maxLap = getByText('00:00:06.000');
    const minLap = getByText('00:00:01.000');


    expect(minlap).toBeInTheDocument();
    expect(window.getComputedStyle(minLap).backgroundColor).toBe('rgb(217, 83, 79)');

    expect(maxLap).toBeInTheDocument();
    expect(window.getComputedStyle(maxLap).backgroundColor).toBe('rgb(217, 83, 79)');


});