import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  interestArea: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  interestArea?: string;
  message?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.interestArea) {
      newErrors.interestArea = 'Please select an interest area';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    if (!validateForm(data)) {
      setIsSubmitting(false);
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      return true;
    } catch (error) {
      setIsSubmitting(false);
      setErrors({ message: 'Something went wrong. Please try again.' });
      return false;
    }
  };

  const resetForm = () => {
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  return {
    errors,
    isSubmitting,
    isSubmitted,
    validateForm,
    submitForm,
    resetForm
  };
};