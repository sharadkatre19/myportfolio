"use client";

import { isValidEmail } from "@/utils/check-email";
import axios, { AxiosError } from "axios";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { TbMailForward, TbCheck, TbX, TbUser, TbMail, TbMessage } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

interface ErrorState {
  email: boolean;
  required: boolean;
}

interface FieldValidationState {
  name: boolean | null;
  email: boolean | null;
  message: boolean | null;
}

interface UserInputState {
  name: string;
  email: string;
  message: string;
}

type FieldName = 'name' | 'email' | 'message';

interface HelperMessages {
  [key: string]: {
    false: string;
    true: string;
  };
}

const ContactForm: React.FC = () => {
  const [error, setError] = useState<ErrorState>({ email: false, required: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldValidation, setFieldValidation] = useState<FieldValidationState>({
    name: null,
    email: null,
    message: null
  });
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [userInput, setUserInput] = useState<UserInputState>({
    name: "",
    email: "",
    message: "",
  });

  // Calculate form completion progress
  useEffect(() => {
    const fields: string[] = [userInput.name, userInput.email, userInput.message];
    const completedFields = fields.filter(field => field.trim().length > 0).length;
    const progress = (completedFields / fields.length) * 100;
    setFormProgress(progress);
  }, [userInput]);

  const checkRequired = (): void => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const validateField = (fieldName: FieldName, value: string): boolean => {
    let isValid = false;
    
    switch (fieldName) {
      case 'name':
        isValid = value.trim().length >= 2;
        break;
      case 'email':
        isValid = isValidEmail(value);
        break;
      case 'message':
        isValid = value.trim().length >= 10;
        break;
      default:
        isValid = false;
    }
    
    setFieldValidation(prev => ({
      ...prev,
      [fieldName]: value.trim().length > 0 ? isValid : null
    }));
    
    return isValid;
  };

  const handleInputChange = (field: FieldName, value: string): void => {
    setUserInput({ ...userInput, [field]: value });
    if (value.trim().length > 0) {
      validateField(field, value);
    } else {
      setFieldValidation(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSendMail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate all fields
    const nameValid = validateField('name', userInput.name);
    const emailValid = validateField('email', userInput.email);
    const messageValid = validateField('message', userInput.message);

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (!nameValid || !emailValid || !messageValid) {
      setError({ ...error, email: !emailValid });
      return;
    } else {
      setError({ ...error, required: false, email: false });
    }

    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
        setFieldValidation({
          name: null,
          email: null,
          message: null
        });
        setShowSuccess(false);
        setFormProgress(0);
      }, 2000);

    } catch (error) {
      console.log("🚀 ~ error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationIcon = (fieldName: FieldName) => {
    const validation = fieldValidation[fieldName];
    if (validation === true) return <TbCheck className="w-5 h-5 text-green-500" />;
    if (validation === false) return <TbX className="w-5 h-5 text-red-500" />;
    return null;
  };

  const getFieldClasses = (fieldName: FieldName): string => {
    const validation = fieldValidation[fieldName];
    const baseClasses = "w-full border rounded-lg transition-all duration-300 px-4 py-3 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1";
    
    if (validation === true) {
      return `${baseClasses} border-green-300 focus:border-green-400 focus:ring-green-200 bg-green-50/30`;
    } else if (validation === false) {
      return `${baseClasses} border-red-300 focus:border-red-400 focus:ring-red-200 bg-red-50/30`;
    } else {
      return `${baseClasses} border-gray-300 focus:border-[#0974f1] focus:ring-blue-200 bg-white hover:border-gray-400`;
    }
  };

  const getHelperText = (fieldName: FieldName): string | null => {
    const validation = fieldValidation[fieldName];
    const messages: HelperMessages = {
      name: {
        false: "Name must be at least 2 characters long",
        true: "Looks good!"
      },
      email: {
        false: "Please provide a valid email address",
        true: "Email format is correct"
      },
      message: {
        false: "Message must be at least 10 characters long",
        true: "Message looks good!"
      }
    };
    
    if (validation !== null) {
      return messages[fieldName][validation.toString() as 'true' | 'false'];
    }
    return null;
  };

  if (showSuccess) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 animate-bounce">
            <TbCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
          <p className="text-green-600 mb-4">Thank you for reaching out. I&apos;ll get back to you soon!</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-500">
            <HiSparkles className="w-4 h-4" />
            <span>Resetting form...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-[#9fccfa] to-[#0974f1] rounded-lg">
            <TbMailForward className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-[#0974f1] uppercase tracking-wide">Get In Touch</h2>
            <p className="text-sm text-gray-500">Let&apos;s start a conversation</p>
          </div>
        </div>
        
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">
            {"Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or potential collaborations. Drop me a message and let's make something amazing together!"}
          </p>
        </div>

        <form onSubmit={handleSendMail} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-700 flex items-center gap-2">
              <TbUser className="w-4 h-4 text-[#0974f1]" />
              Your Name
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className={getFieldClasses('name')}
                type="text"
                maxLength={100}
                required={true}
                placeholder="Enter your full name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                onBlur={checkRequired}
                value={userInput.name}
              />
              <TbUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('name')}
              </div>
            </div>
            {getHelperText('name') && (
              <p className={`text-sm ${fieldValidation.name ? 'text-green-600' : 'text-red-500'}`}>
                {getHelperText('name')}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-700 flex items-center gap-2">
              <TbMail className="w-4 h-4 text-[#0974f1]" />
              Your Email
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className={getFieldClasses('email')}
                type="email"
                maxLength={100}
                required={true}
                placeholder="your.email@example.com"
                value={userInput.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                onBlur={() => {
                  checkRequired();
                  validateField('email', userInput.email);
                }}
              />
              <TbMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('email')}
              </div>
            </div>
            {getHelperText('email') && (
              <p className={`text-sm ${fieldValidation.email ? 'text-green-600' : 'text-red-500'}`}>
                {getHelperText('email')}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-700 flex items-center gap-2">
              <TbMessage className="w-4 h-4 text-[#0974f1]" />
              Your Message
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                className={`${getFieldClasses('message')} pt-3 pb-3 resize-none`}
                maxLength={500}
                name="message"
                required={true}
                placeholder="Tell me about your project, ideas, or just say hello..."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('message', e.target.value)}
                onBlur={checkRequired}
                rows={3}
                value={userInput.message}
              />
              <TbMessage className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <div className="absolute right-4 top-4">
                {getValidationIcon('message')}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {getHelperText('message') && (
                  <p className={`text-sm ${fieldValidation.message ? 'text-green-600' : 'text-red-500'}`}>
                    {getHelperText('message')}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {userInput.message.length}/500
              </span>
            </div>
          </div>

          {/* Error Messages */}
          {error.required && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <TbX className="w-4 h-4" />
                All fields are required! Please fill out the form completely.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button 
              className={`group flex items-center gap-2 hover:gap-4 rounded-full bg-gradient-to-r from-[#9fccfa] to-[#0974f1] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[#0974f1]/25 focus:ring-2 focus:ring-[#0974f1] focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                isLoading ? 'animate-pulse' : ''
              }`}
              type="submit"
              disabled={isLoading || formProgress < 100}
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <TbMailForward className="w-5 h-5 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-200" />
                </>
              )}
            </button>
            
            {formProgress < 100 && (
              <p className="text-xs text-gray-500 text-center">
                Complete all fields to send your message
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;