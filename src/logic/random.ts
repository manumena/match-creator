export function getRandomNumbers(quantity: number, maximumValue: number) {
  const result: number[] = []
  for (let counter = 0; counter < quantity; counter++) {
    // Generate a candidate until is not already included in the results
    let candidate
    do {
      candidate = Math.floor(Math.random() * maximumValue)
    } while (result.includes(candidate))
    
    // Add candidate to results
    result.push(candidate)
  }
  return result
}
