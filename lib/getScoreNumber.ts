export const getScoreNumber = (score: string): number => {
  return score == "Weak" || score == "Too weak"
    ? 33
    : score == "Medium"
      ? 63
      : 100;
};

export const getScoreBasedClassName = (score: string): string => {
  return `${score == "Weak" || score == "Too weak" ? "bg-red-500" : score == "Medium" ? "bg-yellow-500" : "bg-green-500"}`;
};
