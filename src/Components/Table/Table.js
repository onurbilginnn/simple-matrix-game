import styles from './Table.module.css';

const Table = props => {
    const colorOfChosenCell = props.chosenCellColor;
    const matrixSize = props.matrixSize;
   
    const locOfChosenCell = props.locOfChosenCell; 

    let table = [];
    let row = [];
    for(let i = 0; i<matrixSize; i ++) {
        for(let j = 0; j<matrixSize; j++) {
            if(j === locOfChosenCell.col  && i === locOfChosenCell.row) {
                row.push(<td key={"chosen"}
                    style={{backgroundColor: colorOfChosenCell}}
                    onClick={props.chosenOneClicked}
                    ></td>);
            } else {
                row.push(<td
                 onClick={props.normalCellClicked}
                 key={i + "-" + j} ></td>);
            }
        }
        if(row.length > 0) {
            table.push(<tr key={"row" + i} >{row}</tr>);
            row = [];
        }
    }

  return (
    <div>
    <table className={styles.TableContainer}>
    <tbody>
    {table}
    </tbody>
</table>

    </div>
  );
}

export default Table;
