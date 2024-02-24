import React, { useState, useEffect, useRef } from "react";

export const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalId = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  function start() {
    if (isRunning) {
      return;
    }
    setIsRunning(true);
    const startTime = Date.now() - elapsedTime;
    intervalId.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
  }

  function stop() {
    clearInterval(intervalId.current);
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  }

  function handleLap() {
    setLaps([...laps, elapsedTime]);
  }

  function deleteLap(index) {
    const updatedLaps = [...laps];
    updatedLaps.splice(index, 1);
    setLaps(updatedLaps);
  }

  function deleteAllLaps() {
    setLaps([]);
  }

  function timeFormat(time) {
    const milliseconds = time % 100;
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="mainContainer">
      <h1>STOPWATCH</h1>
      <div className="displayContainer">{timeFormat(elapsedTime)}</div>
      <div className="controlsContainer">
        <button className="start" onClick={start}>
          Start
        </button>
        <button className="stop" onClick={stop}>
          Stop
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
        <button className="lap" onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
      </div>
      <div className="lapsContainer">
        {laps.map((lapTime, index) => (
          <div key={index} className="lapItem">
            <div className="lapTime">Lap {index + 1}: {timeFormat(lapTime)}</div>
            <button className="deleteButton" onClick={() => deleteLap(index)}>X</button>
          </div>
        ))}
      </div>
      {laps.length > 0 && (
        <button className="deleteAllButton" onClick={deleteAllLaps}>
          Delete All Laps
        </button>
      )}
    </div>
  );
};
