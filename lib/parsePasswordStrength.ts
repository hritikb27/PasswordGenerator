import { PasswordStrength } from "@/types/passwordTypes";

// Function to map check-password-strength results to PasswordStrength type
const mapStrengthToPasswordStrength = (strength: string): PasswordStrength => {
  switch (strength) {
    case "Weak":
      return "Weak";
    case "Medium":
      return "Medium";
    case "Strong":
      return "Strong";
    default:
      // Handle unexpected values if needed
      return "Weak"; // Default to 'Weak' or throw an error
  }
};

export default mapStrengthToPasswordStrength;
