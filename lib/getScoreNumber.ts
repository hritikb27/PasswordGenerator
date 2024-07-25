export const getScoreNumber = (score: string): number => {
    return score == "Weak" ? 33 : score == "Medium" ? 63 : 100
}

export const getScoreBasedClassName = (score: string): string => {
    return `${score == "Weak" ? "bg-red-500" : score == "Medium" ? "bg-yellow-500" : "bg-green-500"}`
}