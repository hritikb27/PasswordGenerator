import { PasswordStrength } from "@/types/passwordTypes";

export const getScoreNumber = (score: string): number => {
    return (score == PasswordStrength.WEAK || score == PasswordStrength.TOOWEAK)
    ? 33
        : score == PasswordStrength.MEDIUM
      ? 63
      : 100;
};

export const getScoreBasedClassName = (score: string): string => {
    return `${score == PasswordStrength.WEAK || score == PasswordStrength.TOOWEAK ? "bg-red-500" : score == PasswordStrength.MEDIUM ? "bg-yellow-500" : score == PasswordStrength.STRONG && "bg-green-500"}`;
};
