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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errors, setErrors] = useState<{
        firstName?: string,
        lastName?: string,
        businessName?: string,
        email?: string,
        phoneNumber?: string
    }>({});

    const validate = (): boolean => {
        let tempErrors: {
            firstName?: string,
            lastName?: string,
            businessName?: string,
            email?: string,
            phoneNumber?: string
        } = {};

        if (!firstName.trim()) tempErrors.firstName = "First Name is required";
        if (!lastName.trim()) tempErrors.lastName = "Last Name is required";
        if (!businessName.trim()) tempErrors.businessName = "Business Name is required";
        const emailError = emailValidation(email);
        if (emailError) tempErrors.email = emailError;
        if (!phoneNumber.trim()) tempErrors.phoneNumber = "Phone Number is required";
        else if (!/^\+?(\d.*){3,}$/.test(phoneNumber)) {
            tempErrors.phoneNumber = "Phone Number is not valid";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;  // returns true if no errors
    };

    return {
        firstName, setFirstName,
        lastName, setLastName,
        businessName, setBusinessName,
        email, setEmail,
        phoneNumber, setPhoneNumber,
        errors, validate
    };
}

export { emailValidation, useForm };
