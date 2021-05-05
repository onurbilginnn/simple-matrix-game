import { React, useState, useEffect } from 'react';
import Table from '../../Components/Table/Table';
import catchedSound from  '../../assets/sounds/catched.mp3';
import styles from './TheGame.module.css';

const colors = ['#FFF07C', '#80FF72', '#7EE8FA', '#E58C8A', '#4A314D', '#8C271E'];
const clickColors = {true: '#7DCE60', false: '#800E13'};
const SECOND_LEVEL_POINT = 15;

const TheGame = props => {
   const clickedSound = new Audio(catchedSound);
    const [chosenCellColor, setChosenCellColor] = useState(colors[0]);
    const [titleColor, setTitleColor] = useState('black');
    const [totalPoints, setTotalPoints] = useState(0);
    const [matrixSize, setMatrixSize] = useState(4);    
    const [intervalTime, setIntervalTime] = useState(1000);
    const [locOfChosenCell, setLocOfChosenCell] = useState({
        row: Math.floor(Math.random() * matrixSize),
         col: Math.floor(Math.random() * matrixSize)
    });
    const chosenCellCliked = () => {
        clickedSound.play();
        const randomColorNumber = Math.floor(Math.random() * colors.length); 
        let totalScore = totalPoints;
        totalScore += 10;
        setTotalPoints(totalScore);
        setTitleColor(clickColors.true);
         setChosenCellColor(colors[randomColorNumber]);
    }

    const normalCellClicked = () => {
        const randomColorNumber = Math.floor(Math.random() * colors.length); 
        let totalScore = totalPoints;
        totalScore -= 5;
        setTotalPoints(totalScore);
        setTitleColor(clickColors.false);
         setChosenCellColor(colors[randomColorNumber]);
    }

    useEffect(() => {
        const interval = setInterval(() => {
          const updatedCellLocation = {
              row: Math.floor(Math.random() * matrixSize),
            col: Math.floor(Math.random() * matrixSize)};
            setLocOfChosenCell(updatedCellLocation);
        }, intervalTime);
        return () => clearInterval(interval);
      }, [intervalTime, matrixSize]);

      useEffect(() => {
       if(totalPoints > SECOND_LEVEL_POINT) {
            setMatrixSize(6);
            setIntervalTime(800);
       } else {
        setMatrixSize(4);
        setIntervalTime(1000);
       }
      }, [totalPoints]);

  return (<div className={styles.GameContainer}>
        <h2 style={{color: titleColor}}>YAKALA BENİ</h2>
        <Table
         chosenOneClicked={chosenCellCliked}
         normalCellClicked={normalCellClicked}
            chosenCellColor = {chosenCellColor}
            locOfChosenCell= {locOfChosenCell}
            matrixSize={matrixSize}
        />
        <h3>PUAN: {totalPoints}</h3>
  </div>
  );
}

export default TheGame;
