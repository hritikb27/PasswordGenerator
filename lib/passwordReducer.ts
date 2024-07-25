import {
  CheckBoxItem,
  PasswordAction,
  PasswordState,
} from "@/types/passwordTypes";

// Define the initial state
export const initialState: PasswordState = {
  includeUppercase: true,
  includeLowercase: false,
  includeNumbers: false,
  includeSpecial: true,
  easyRead: false,
};

// Reducer function for password generator state management
export function passwordReducer(
  state: PasswordState,
  action: PasswordAction,
): PasswordState {
  switch (action.type) {
    case "includeUppercase":
      return { ...state, includeUppercase: !state.includeUppercase };
    case "includeLowercase":
      return { ...state, includeLowercase: !state.includeLowercase };
    case "includeNumbers":
      return { ...state, includeNumbers: !state.includeNumbers };
    case "includeSpecial":
      return { ...state, includeSpecial: !state.includeSpecial };
    case "easyRead":
      return { ...state, easyRead: !state.easyRead };
    default:
      return state;
  }
}

export const checkBoxItems: CheckBoxItem[] = [
  {
    name: "Include Uppercase Letters",
    selector: "includeUppercase",
  },
  {
    name: "Include Lowercase Letters",
    selector: "includeLowercase",
  },
  {
    name: "Include Numbers",
    selector: "includeNumbers",
  },
  {
    name: "Include Special Characters",
    selector: "includeSpecial",
  },
  {
    name: "Easy Read (Exclude 0, O, I and l)",
    selector: "easyRead",
  },
];
