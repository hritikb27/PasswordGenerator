import { GeneratePassword, PasswordStrength } from "@/types/passwordTypes";
import { passwordStrength } from "check-password-strength";

// Memoize the character pool to avoid recalculating on every render
const characterPool = ({
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSpecial,
  easyRead,
}: GeneratePassword) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+[]{}|;:,.<>?";

  let pool = "";
  if (includeUppercase) pool += upper;
  if (includeLowercase) pool += lower;
  if (includeNumbers) pool += numbers;
  if (includeSpecial) pool += special;
  if (easyRead) {
    pool = pool.replace(/[0OIl]/g, "");
  }
  return pool;
};

// Generate password score based on how many options have been used
const generateScore = (password: string) => {
    return passwordStrength(password).value as PasswordStrength;
};

// Function to generate a password based on state
export const generatePassword = ({
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSpecial,
  easyRead,
  length,
}: GeneratePassword): {
  password: string;
  score: PasswordStrength;
} => {
  const pool = characterPool({
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecial,
    easyRead,
  });
  if (pool === "") {
    return {
    password: "",
    score: PasswordStrength.TOOWEAK,
    };
  }

  let generatedPassword = "";
  if (length) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      generatedPassword += pool[randomIndex];
    }
  }
  const scoreGen = generateScore(generatedPassword);
  return {
    password: generatedPassword,
    score: scoreGen,
  };
};
