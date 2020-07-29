export const isPalindrome = x => {
  const n = x
    if (x < 0) return false
    
    let result = 0
    while(x != 0) {
        result = result * 10 + x % 10
        x = ~~(x / 10)
    }
    
    return result === n
}