import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number is too long'),
  organization: z.string().min(2, 'Organization name is required').max(200, 'Organization name is too long'),
  city: z.string().min(2, 'City is required').max(100, 'City name is too long'),
  country: z.string().min(2, 'Country is required').max(100, 'Country name is too long'),
  participant_type: z.enum(['student', 'professional', 'researcher', 'educator', 'other'], {
    error: 'Please select a participant type',
  }),
  area_of_interest: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced'], {
    error: 'Please select your experience level',
  }),
  qiskit_experience: z.enum(['none', 'basic', 'intermediate', 'advanced'], {
    error: 'Please select your Qiskit experience level',
  }),
  expectations: z.string().min(10, 'Please provide at least 10 characters').max(1000, 'Expectations are too long'),
  referral_source: z.string().min(2, 'Please tell us how you heard about us').max(200, 'Referral source is too long'),
  consent_data_processing: z.boolean().refine((val) => val === true, {
    message: 'You must consent to data processing',
  }),
  consent_communications: z.boolean(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
