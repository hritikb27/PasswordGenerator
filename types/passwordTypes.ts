// Define the state type for the password generator
export interface PasswordState {
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSpecial: boolean;
    easyRead: boolean;
}

// Define the action types for the reducer
export type PasswordAction =
    | { type: 'includeUppercase' }
    | { type: 'includeLowercase' }
    | { type: 'includeNumbers' }
    | { type: 'includeSpecial' }
    | { type: 'easyRead' }

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

export type GeneratePassword = {
    includeUppercase: boolean,
    includeLowercase: boolean,
    includeNumbers: boolean,
    includeSpecial: boolean,
    easyRead: boolean,
    length?: number
}

// Define the enum for password strength
export enum PasswordStrength {
    'Too weak',
    'Weak',
    'Medium',
    'Strong',
}