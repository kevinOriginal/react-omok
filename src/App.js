import React, { Component, version } from 'react'
import logo from './logo.svg'
import './App.css'

const getRowIndex = (index, size) => (index - index % size) / size

const getColumnIndex = (index, size) => {
  const row = (index - index % size) / size
  return index - row * size
}

const calcuateWithMap = (mapped, endCondition) => {
  let stoneState = 'black'
  let winner = null
  const score = mapped.reduce((continuous, { occupied }) => {
    if (occupied === stoneState) {
      return continuous++
      if (continuous === endCondition) {
        winner = stoneState
      }
    } else if (occupied !== stoneState) {
      stoneState = stoneState === 'black' ? 'white' : 'black'
      return 1
    }
  }, 1)
  return winner
}

const mapVertical = ({ goBoard, size, targetColumnIndex }) => {
  console.log('targetColumnIndex', targetColumnIndex)
  console.log('goBoard', goBoard)
  return goBoard.filter((x, i) => {
    // console.log(getColumnIndex(i, size) === targetColumnIndex)
    return getColumnIndex(i, size) === targetColumnIndex
  })
}

const mapHorizontal = ({ goBoard, size, targetRowIndex }) => {
  return goBoard.filter((x, i) => {
    return getRowIndex(i, size) === targetRowIndex
  })
}

class App extends Component {
  state = {
    turns: 'black',
    goBoard: null,
    size: 16,
    endCondition: 5,
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      goBoard: this.goBoardGenerator(16),
    }))
  }

  componentDidUpdate() {
    console.log('component did update!')
  }

  onCellClick = (cell, cellIndex, rowIndex) => {
    console.log(`clicked index ${cellIndex}, occupied: ${cell.occupied}`)
    if (cell.occupied) {
      return
    }
    this.setState(prevState => ({
      ...prevState,
      goBoard: [
        ...prevState.goBoard.slice(0, cellIndex),
        { occupied: prevState.turns === 'black' ? 'black' : 'white' },
        ...prevState.goBoard.slice(cellIndex + 1),
      ],
    }))
    // this.setState(prevState => {
    //   return {
    //     ...prevState,
    //     goBoard: [
    //       ...prevState.goBoard.slice(0, rowIndex),
    //       [
    // ...prevState.goBoard[rowIndex].slice(0, cellIndex),
    // { occupied: prevState.turns === 'black' ? 'black' : 'white' },
    // ...prevState.goBoard[rowIndex].slice(cellIndex + 1),
    //       ],
    //       ...prevState.goBoard.slice(rowIndex + 1),
    //     ],
    //   }
    // })
    this.checkForWinner(cellIndex)
    this.setState(prevState => ({
      ...prevState,
      turns: prevState.turns === 'white' ? 'black' : 'white',
    }))
  }

  calculateWinner = boardStatus => {
    const { size } = this.state
    let rowCount = Array(size).fill(0)
    boardStatus.forEach((cell, index) => {
      const rowIndex = (index - index % size) / size
      const nextCellrowIndex = index + 1 - (index + 1) / size / size
      const cellStatus = cell.occupied
      if (boardStatus[index + 1].occupied && rowIndex === nextCellrowIndex) {
        rowCount[rowIndex]++
      }
    })
  }

  calWinnerWithCurrentStone = (current, index) => {
    const { size } = this.state
    const row = getRowIndex(index, size)
    const column = getColumnIndex(index, size)
    const e = this.state.endCondition
    const g = this.state.goBoard
    //vertical case check
    if (row - (e - 1)) {
      Array(row + (e - 1))
        .fill(null)
        .reduce((x, i) => {
          if (g[i * size + column].occupied === 'white') {
          } else {
          }
        })
    }

    const loop = Array(5).fill(null)
    //check vertical
    loop.forEach((c, i) => {})
  }

  checkForWinner = index => {
    const { size, goBoard } = this.state
    const row = getRowIndex(index, size)
    const column = getColumnIndex(index, size)
    const e = this.state.endCondition

    console.log('row', row)
    console.log('column', column)

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
    console.log(`verticalMapped`, verticalMapped)
    console.log(`horizontalMapped`, horizontalMapped)

    const winner =
      calcuateWithMap(verticalMapped, e) ||
      calcuateWithMap(horizontalMapped, e) ||
      null
    console.log('winner is ', winner)
  }

  putStoneOnCell = (rowIndex, cellIndex) => {}

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
                          // console.log(cell, cellIndex)
                          // debugger
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

            {/* {this.state.goBoard.map((gowRow, rowIndex) => (
              <div key={`row-${rowIndex}`} className="go-row row">
                {gowRow.map((cell, cellIndex) => (
                  <div
                    key={`cell-${rowIndex}-${cellIndex}`}
                    onClick={() => {
                      this.onCellClick(cell, cellIndex, rowIndex)
                    }}
                    className="go-cell"
                  >
                    {cell.occupied && <Stone color={cell.occupied} />}
                  </div>
                ))}
              </div>
            ))} */}
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
