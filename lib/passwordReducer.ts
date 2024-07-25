import { CheckBoxItem, PasswordAction, PasswordState } from "@/types/passwordTypes";

// Define the initial state
export const initialState: PasswordState = {
    length: 8,
    includeUppercase: true,
    includeLowercase: false,
    includeNumbers: false,
    includeSpecial: true,
    easyRead: false,
    password: '',
};

// Reducer function for password generator state management
export function passwordReducer(state: PasswordState, action: PasswordAction): PasswordState {
    switch (action.type) {
        case 'SET_LENGTH':
            return { ...state, length: action.payload };
        case 'includeUppercase':
            return { ...state, includeUppercase: !state.includeUppercase };
        case 'includeLowercase':
            return { ...state, includeLowercase: !state.includeLowercase };
        case 'includeNumbers':
            return { ...state, includeNumbers: !state.includeNumbers };
        case 'includeSpecial':
            return { ...state, includeSpecial: !state.includeSpecial };
        case 'easyRead':
            return { ...state, easyRead: !state.easyRead };
        case 'GENERATE_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        default:
            return state;
    }
}

export const checkBoxItems: CheckBoxItem[] = [
    {
        name: "Include Uppercase Letters",
        selector: "includeUppercase"
    },
    {
        name: "Include Lowercase Letters",
        selector: "includeLowercase"
    },
    {
        name: "Include Numbers",
        selector: "includeNumbers"
    },
    {
        name: "Include Special Characters",
        selector: "includeSpecial"
    },
    {
        name: "Easy Read (Exclude 0, O, I and l)",
        selector: "easyRead"
    },
]
