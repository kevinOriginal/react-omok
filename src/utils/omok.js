export const getRowIndex = (index, size) => (index - index % size) / size

export const getColumnIndex = (index, size) => {
  const row = (index - index % size) / size
  return index - row * size
}

export const mapVertical = ({ goBoard, size, targetColumnIndex }) => {
  return goBoard.filter((x, i) => {
    return getColumnIndex(i, size) === targetColumnIndex
  })
}

export const mapHorizontal = ({ goBoard, size, targetRowIndex }) => {
  return goBoard.filter((x, i) => {
    return getRowIndex(i, size) === targetRowIndex
  })
}

export const mapIncrementDiagonal = ({ goBoard, size, cellIndex }) => {
  //FIXME: If you can!
  const col = getColumnIndex(cellIndex, size)
  const row = getRowIndex(cellIndex, size)
  let mappedArray = []
  if (col > row) {
    const diff = col - row
    for (let i = 0; i < diff + 1; i++) {
      const targetIndex = size * i + (i + diff)
      mappedArray.push(goBoard[targetIndex])
    }
  } else if (col < row) {
    const diff = row - col
    for (let i = 0; i < diff + 1; i++) {
      const targetIndex = size * (i + diff) + i
      mappedArray.push(goBoard[targetIndex])
    }
  }
  return mappedArray
}

export const mapDecrementDiagonal = ({ goBoard, size, cellIndex }) => {
  //FIXME: If you can!
  const col = getColumnIndex(cellIndex, size)
  const row = getRowIndex(cellIndex, size)
  let mappedArray = []
  const sum = col + row
  for (let i = 0; i < sum + 1; i++) {
    const targetIndex = size * i + (sum - i)
    mappedArray.push(goBoard[targetIndex])
  }
  return mappedArray
}

export const calcuateWithMap = (mapped, endCondition) => {
  let stoneState = 'black'
  let winner = null
  const score = mapped.reduce((continuous, { occupied }) => {
    if (occupied === stoneState) {
      const nextContinousCount = continuous + 1
      if (nextContinousCount === endCondition) {
        winner = stoneState
      }
      return nextContinousCount
    } else if (occupied !== stoneState) {
      stoneState = stoneState === 'black' ? 'white' : 'black'
      return 1
    }
  }, 0)
  return winner
}
