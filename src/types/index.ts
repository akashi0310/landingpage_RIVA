export type CompetitionStatus = 'open' | 'upcoming' | 'closed';

export interface Competition {
  id: string;
  code: string;
  title: string;
  country: string;
  country_code: string;
  flag_emoji: string;
  location: string;
  category: string;
  status: CompetitionStatus;
  deadline: string;
  event_date: string;
  fee?: string;
  organizer?: string;
  description: string;
  requirements?: string[];
  timeline?: { step: string; title: string; desc: string; date?: string }[];
}

export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'student' | 'parent' | 'teacher' | 'other';
  school?: string;
  interest_competition?: string;
  interest_field?: string;
  message?: string;
  created_at?: string;
}

export type ApplicationStatus = 'submitted' | 'under_review' | 'approved' | 'revision_requested' | 'rejected';

export interface Application {
  id: string;
  user_id?: string;
  full_name: string;
  dob: string;
  nationality: string;
  email: string;
  phone: string;
  school: string;
  city: string;
  competition_code: string;
  competition_title: string;
  project_title: string;
  project_field: string;
  project_summary: string;
  status: ApplicationStatus;
  admin_notes?: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  student_name: string;
  school: string;
  award: string;
  medal_type: 'gold' | 'silver' | 'bronze' | 'special';
  competition: string;
  year: number;
  project_title: string;
  avatar_url: string;
}

export type ActiveView = 
  | 'home' 
  | 'competition-detail' 
  | 'student-dashboard' 
  | 'admin-dashboard';
