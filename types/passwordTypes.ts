// Define the state type for the password generator
export interface PasswordState {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSpecial: boolean;
    easyRead: boolean;
    password: string;
}

// Define the action types for the reducer
export type PasswordAction =
    | { type: 'SET_LENGTH'; payload: number }
    | { type: 'includeUppercase' }
    | { type: 'includeLowercase' }
    | { type: 'includeNumbers' }
    | { type: 'includeSpecial' }
    | { type: 'easyRead' }
    | { type: 'GENERATE_PASSWORD'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string };

export type CheckBoxSelectorState = {
    includeUppercase: true,
    includeLowercase: false,
    includeNumbers: false,
    includeSpecial: true,
    easyRead: false
}

// Define the checkbox items with proper typing
export type CheckBoxItem = {
    name: string;
    selector: keyof CheckBoxSelectorState;
};