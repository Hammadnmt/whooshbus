// hooks/useHandleChange.ts
"use client";
import { useState } from "react";

type FormValues = {
  [key: string]: string;
};

export function useHandleChange(initialValues: FormValues = {}) {
  const [formData, setFormData] = useState<FormValues>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setFormData(initialValues);

  return { formData, handleChange, resetForm };
}
