import { useState } from "react";

const emailValidation = (email: string): string => {
    
    if (!email.trim()) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {  // simple regex for email
        return "Email is not valid";
    }
    return '';
};

const useForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string, email?: string }>({});

    const validate = (): boolean => {
        let tempErrors: { name?: string, email?: string } = {};
    
        if (!name.trim()) tempErrors.name = "Name is required";
    
        const emailError = emailValidation(email);
        if (emailError) {
            tempErrors.email = emailError;
        }
    
        setErrors(tempErrors);
    
        return Object.keys(tempErrors).length === 0;  // returns true if no errors
    };

    return { name, setName, email, setEmail, errors, validate };
  }

export  {emailValidation, useForm}