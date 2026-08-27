'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from '@/lib/validations';
import { registrationApi } from '@/lib/api';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await registrationApi.create(data);
      setRegistrationId(response.registration_id);
      setSubmitSuccess(true);
      reset();
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        // Handle both string and array of validation errors
        if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (Array.isArray(detail)) {
          errorMessage = detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
        } else {
          errorMessage = JSON.stringify(detail);
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for Qiskit Fall Fest 2026. Your registration ID is:
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold text-purple-600">{registrationId}</p>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please save this ID for your records. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setRegistrationId('');
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
            >
              Register Another Person
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Register Now</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Join Qiskit Fall Fest 2026 and be part of the quantum revolution. Registration is free!
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {submitError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+1234567890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Organization Details */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Organization Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization/Institution *
                    </label>
                    <input
                      {...register('organization')}
                      type="text"
                      id="organization"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="University Name or Company"
                    />
                    {errors.organization && (
                      <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        {...register('city')}
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <input
                        {...register('country')}
                        type="text"
                        id="country"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="United States"
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Background Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="participant_type" className="block text-sm font-medium text-gray-700 mb-1">
                      Participant Type *
                    </label>
                    <select
                      {...register('participant_type')}
                      id="participant_type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="researcher">Researcher</option>
                      <option value="educator">Educator</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.participant_type && (
                      <p className="mt-1 text-sm text-red-600">{errors.participant_type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Interest * (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      {[
                        'Quantum Algorithms',
                        'Quantum Machine Learning',
                        'Quantum Hardware',
                        'Quantum Cryptography',
                        'Quantum Error Correction',
                        'Quantum Applications',
                      ].map((area) => (
                        <label key={area} className="flex items-center">
                          <input
                            {...register('area_of_interest')}
                            type="checkbox"
                            value={area}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="ml-2 text-gray-700">{area}</span>
                        </label>
                      ))}
                    </div>
                    {errors.area_of_interest && (
                      <p className="mt-1 text-sm text-red-600">{errors.area_of_interest.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantum Computing Experience Level *
                    </label>
                    <select
                      {...register('experience_level')}
                      id="experience_level"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.experience_level && (
                      <p className="mt-1 text-sm text-red-600">{errors.experience_level.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="qiskit_experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Qiskit Experience Level *
                    </label>
                    <select
                      {...register('qiskit_experience')}
                      id="qiskit_experience"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select level</option>
                      <option value="none">None</option>
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.qiskit_experience && (
                      <p className="mt-1 text-sm text-red-600">{errors.qiskit_experience.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="expectations" className="block text-sm font-medium text-gray-700 mb-1">
                      What do you hope to gain from this event? *
                    </label>
                    <textarea
                      {...register('expectations')}
                      id="expectations"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell us about your expectations and goals..."
                    />
                    {errors.expectations && (
                      <p className="mt-1 text-sm text-red-600">{errors.expectations.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="referral_source" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us? *
                    </label>
                    <input
                      {...register('referral_source')}
                      type="text"
                      id="referral_source"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Social media, friend, website, etc."
                    />
                    {errors.referral_source && (
                      <p className="mt-1 text-sm text-red-600">{errors.referral_source.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Consent */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Consent</h3>
                
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      {...register('consent_data_processing')}
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I consent to the processing of my personal data for event registration and communication purposes. *
                    </span>
                  </label>
                  {errors.consent_data_processing && (
                    <p className="ml-6 text-sm text-red-600">{errors.consent_data_processing.message}</p>
                  )}

                  <label className="flex items-start">
                    <input
                      {...register('consent_communications')}
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I would like to receive updates about future quantum computing events and opportunities.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
