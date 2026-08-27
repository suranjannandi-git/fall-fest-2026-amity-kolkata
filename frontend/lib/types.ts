export interface Registration {
  registration_id?: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  city: string;
  country: string;
  participant_type: 'student' | 'professional' | 'researcher' | 'educator' | 'other';
  area_of_interest: string[];
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  qiskit_experience: 'none' | 'basic' | 'intermediate' | 'advanced';
  expectations: string;
  referral_source: string;
  consent_data_processing: boolean;
  consent_communications: boolean;
  status?: 'pending' | 'confirmed' | 'cancelled';
  registered_at?: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegistrationResponse {
  registration_id: string;
  message: string;
}
