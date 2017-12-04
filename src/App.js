import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    turns: 'black',
    goBoard: Array(2).fill(Array(2).fill({ occupied: null })),
    size: 16,
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
    this.setState(prevState => {
      return {
        ...prevState,
        goBoard: [
          ...prevState.goBoard.slice(0, rowIndex),
          [
            ...prevState.goBoard[rowIndex].slice(0, cellIndex),
            { occupied: prevState.turns === 'black' ? 'black' : 'white' },
            ...prevState.goBoard[rowIndex].slice(cellIndex + 1),
          ],
          ...prevState.goBoard.slice(rowIndex + 1),
        ],
      }
    })

    this.setState(prevState => ({
      ...prevState,
      turns: prevState.turns === 'white' ? 'black' : 'white',
    }))
  }

  calculateWinner = boardStatus => {
    const { size } = this.state
    boardStatus.forEach(cell => {})
  }

  putStoneOnCell = (rowIndex, cellIndex) => {}

  goBoardGenerator = size => {
    return Array(size).fill(Array(size).fill({ occupied: null }))
  }
  render() {
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
            {this.state.goBoard.map((gowRow, rowIndex) => (
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
            ))}
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
