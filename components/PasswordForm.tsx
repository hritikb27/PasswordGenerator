"use client";

import React, {
    useReducer,
    useMemo,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "../lib/formSchema";
import {
    passwordReducer,
    initialState,
    checkBoxItems,
} from "../lib/passwordReducer";
import { passwordStrength } from "check-password-strength";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import CopyButton from "./ui/copyIcon";
import { CheckBoxSelectorState, PasswordState, PasswordStrength } from "@/types/passwordTypes";
import { generatePassword } from "@/lib/generatePassword";
import { getScoreBasedClassName, getScoreNumber } from "@/lib/getScoreNumber";

export function PasswordForm() {
    // Use form hook for form validation and submission
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });

    // Use reducer for password generator state
    const [state, dispatch] = useReducer(passwordReducer, initialState);
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [passwordLength, setPasswordLength] = useState<number>(6);
    const [score, setScore] = useState<keyof typeof PasswordStrength>("Weak");

    // Generate password on initial render
    useEffect(() => {
        handleGeneratePassword()
    }, []);

    // Submit handler for the form
    const onSubmit: SubmitHandler<FormSchema> = (values) => {
        handleGeneratePassword()
    };

    const handleGeneratePassword = useCallback(() => {
        const getPassword = generatePassword({
            includeUppercase: state.includeUppercase,
            includeLowercase: state.includeLowercase,
            includeNumbers: state.includeNumbers,
            includeSpecial: state.includeSpecial,
            easyRead: state.easyRead,
            length: passwordLength
        });
        setPasswordValue(getPassword.password);
        form.setValue("password", getPassword.password);
        setScore(getPassword.score);
    }, [state, passwordLength]);

    // Handler to ensure at least one checkbox remains checked
    const handleCheckboxChange = (type: keyof CheckBoxSelectorState) => {
        // Toggle the checkbox for the given type
        const updatedState = {
            ...state,
            [type]: !state[type],
        };

        // Filter out the checked items
        const checkedItems = Object.keys(updatedState).filter(
            (key) => {
                const keyTyped = key as keyof PasswordState;
                return updatedState[keyTyped] === true;
            }
        );

        // If no checkbox is checked
        if (checkedItems.length < 1) {
            // enforce "includeLowercase" remains checked
            dispatch({ type: `includeLowercase` });
        }

        // Update the state
        dispatch({ type: `${type}` });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 w-full sm:w-[40%] lg:w-[30%] 2xl:w-[20%]"
            >
                {/* Password value input and score viewer */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="flex gap-2 items-center">
                                <FormControl>
                                    <Input {...field} data-test-id="password-input" readOnly />
                                </FormControl>
                                <CopyButton passwordValue={passwordValue} />
                            </div>
                            {
                                <div className="text-sm text-[#64748b]">
                                    <Progress
                                        value={getScoreNumber(score)}
                                        className={getScoreBasedClassName(score)}
                                        data-test-id="password-score-progress"
                                    />
                                    <span data-test-id="password-score">{score}</span>
                                </div>
                            }
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password length input */}
                <div className="flex flex-col gap-2">
                    <div className="w-full flex gap-2">
                        <label>Password Length:</label>
                        <input
                            type="number"
                            data-test-id="password-length-input"
                            value={passwordLength}
                            className="border border-black rounded px-2"
                            onChange={(e) =>
                                setPasswordLength(Number(e.target.value))
                            }
                            min="6"
                            max="30"
                        />
                    </div>

                    {/* All the options checkboxes */}
                    {checkBoxItems.map((item) => {
                        return (
                            <div key={item.selector} className="flex items-center space-x-2">
                                <Checkbox
                                    datatestid={item.selector}
                                    name={item.selector}
                                    checked={state[item.selector]}
                                    onCheckedChange={() => handleCheckboxChange(item.selector)}
                                />
                                <label
                                    htmlFor="terms2"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item.name}
                                </label>
                            </div>
                        );
                    })}
                </div>

                <Button
                    type="submit"
                    data-test-id="generate-password-btn"
                >
                    Generate Password
                </Button>
            </form>
        </Form>
    );
}
