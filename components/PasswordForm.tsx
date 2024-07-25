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
import { CheckBoxSelectorState, PasswordStrength } from "@/types/passwordTypes";
import mapStrengthToPasswordStrength from "@/lib/parsePasswordStrength";

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
  const [score, setScore] = useState<PasswordStrength>("Weak");

  // Generate password on initial render
  useEffect(() => {
    generatePassword();
  }, []);

  // Memoize the character pool to avoid recalculating on every render
  const characterPool = useMemo(() => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+[]{}|;:,.<>?";

    let pool = "";
    if (state.includeUppercase) pool += upper;
    if (state.includeLowercase) pool += lower;
    if (state.includeNumbers) pool += numbers;
    if (state.includeSpecial) pool += special;
    if (state.easyRead) {
      pool = pool.replace(/[0OIl]/g, "");
    }
    return pool;
  }, [
    state.includeUppercase,
    state.includeLowercase,
    state.includeNumbers,
    state.includeSpecial,
    state.easyRead,
  ]);

  // Function to generate a password based on state
  const generatePassword = useCallback(() => {
    if (characterPool === "") {
      dispatch({ type: "GENERATE_PASSWORD", payload: "" });
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < state.length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    dispatch({ type: "GENERATE_PASSWORD", payload: generatedPassword });
    form.setValue("password", generatedPassword);
    const scoreGen = generateScore();
    const parsedValue = mapStrengthToPasswordStrength(scoreGen);
    setScore(parsedValue);
  }, [state, form, characterPool]);

  // Submit handler for the form
  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    generatePassword();
  };

  // Generate password score based on how many options have been used
  const generateScore = useCallback(() => {
    return passwordStrength(state.password).value;
  }, [state.password]);

  // Handler to ensure at least one checkbox remains checked
  const handleCheckboxChange = (type: keyof CheckBoxSelectorState) => {
    // Toggle the checkbox for the given type
    const updatedState = {
      ...state,
      [type]: !state[type],
    };

    // Filter out the checked items
    const checkedItems = Object.keys(updatedState).filter(
      (key) =>
        (updatedState[key as keyof typeof updatedState] as boolean) &&
        key !== "length" &&
        key !== "password",
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
                <CopyButton passwordValue={state.password} />
              </div>
              {score && (
                <div className="text-sm text-[#64748b]">
                  <Progress
                    value={score == "Weak" ? 33 : score == "Medium" ? 63 : 100}
                    className={`${score == "Weak" ? "bg-red-500" : score == "Medium" ? "bg-yellow-500" : "bg-green-500"}`}
                    data-test-id="password-score-progress"
                  />
                  <span data-test-id="password-score">{score}</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <label>Password Length:</label>
            <input
              type="number"
              data-test-id="password-length-input"
              value={state.length}
              className="border border-black rounded px-2"
              onChange={(e) =>
                dispatch({
                  type: "SET_LENGTH",
                  payload: Number(e.target.value),
                })
              }
              min="6"
              max="30"
            />
          </div>

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
          onClick={generatePassword}
        >
          Generate Password
        </Button>
      </form>
    </Form>
  );
}
