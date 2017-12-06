import React, { Component, version } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  getRowIndex,
  getColumnIndex,
  mapVertical,
  mapHorizontal,
  mapIncrementDiagonal,
  mapDecrementDiagonal,
  calcuateWithMap,
} from './utils/omok'

class App extends Component {
  state = {
    turns: 'black',
    goBoard: null,
    size: 16,
    endCondition: 5,
    occupiedCell: null,
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      goBoard: this.goBoardGenerator(16),
    }))
  }

  componentDidUpdate() {
    this.checkForWinner(this.state.occupiedCell)
  }

  onCellClick = (cell, cellIndex, rowIndex) => {
    if (cell.occupied) {
      return
    }
    this.setState(prevState => ({
      ...prevState,
      occupiedCell: cellIndex,
      goBoard: [
        ...prevState.goBoard.slice(0, cellIndex),
        { occupied: prevState.turns === 'black' ? 'black' : 'white' },
        ...prevState.goBoard.slice(cellIndex + 1),
      ],
      turns: prevState.turns === 'white' ? 'black' : 'white',
    }))
  }

  checkForWinner = index => {
    const { size, goBoard } = this.state
    const row = getRowIndex(index, size)
    const column = getColumnIndex(index, size)
    const e = this.state.endCondition

    const verticalMapped = mapVertical({
      goBoard,
      size,
      targetColumnIndex: column,
    })

    const horizontalMapped = mapHorizontal({
      goBoard,
      size,
      targetRowIndex: row,
    })

    const incDiagonalMapped = mapIncrementDiagonal({
      goBoard,
      size,
      cellIndex: index,
    })

    const decDiagonalMapped = mapDecrementDiagonal({
      goBoard,
      size,
      cellIndex: index,
    })

    console.log('inc diag', incDiagonalMapped)
    console.log('dec diag', decDiagonalMapped)

    const winner =
      calcuateWithMap(verticalMapped, e) ||
      calcuateWithMap(horizontalMapped, e) ||
      null
    // console.log('winner is ', winner)
  }

  goBoardGenerator = size => {
    return Array(size * size).fill({ occupied: null })
  }

  render() {
    const { size } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-5mok</h1>
        </header>
        <p className="App-intro">
          Created by <code>@kevinoriginal</code> reach me by tost8295@gmail.com
        </p>
        <div>
          <div className="go-board">
            {this.state.goBoard &&
              Array(size)
                .fill(null)
                .map((x, rowIndex) => {
                  return (
                    <div key={`row-${rowIndex}`} className="go-row row">
                      {Array(size)
                        .fill(null)
                        .map((x, columnIndex) => {
                          const cellIndex = rowIndex * size + columnIndex
                          const cell = this.state.goBoard[cellIndex]
                          return (
                            <div
                              key={`cell-${rowIndex}-${cellIndex}`}
                              className="go-cell"
                              onClick={() => {
                                this.onCellClick(cell, cellIndex, rowIndex)
                              }}
                            >
                              {cell.occupied && <Stone color={cell.occupied} />}
                            </div>
                          )
                        })}
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    )
  }
}

const Stone = props => (
  <div className="stone" style={{ background: `${props.color}` }} />
)

export default App
