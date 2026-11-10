export type Role = 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'HOSPITAL_ADMIN' | 'SUPER_ADMIN';
export type View = 'patient' | 'reception' | 'doctor' | 'admin';
export const specialties = ['General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Dermatology', 'Neurology', 'ENT', 'Ophthalmology', 'Diabetes & Endocrinology'];
export const hospitals = [
  { id: 'h1', name: 'KIMS Saveera Multispeciality Hospital', city: 'Anantapur', district: 'Anantapur', address: 'Rudrampeta, Anantapur, AP 515001', rating: '4.7', doctors: 24, next: 'Today, 10:30 AM', aarogyasri: true },
  { id: 'h2', name: 'Government General Hospital', city: 'Anantapur', district: 'Anantapur', address: 'Srinivasa Nagar, Anantapur', rating: '4.3', doctors: 38, next: 'Today, 11:15 AM', aarogyasri: true },
  { id: 'h3', name: 'Medisense Super Speciality Hospital', city: 'Anantapur', district: 'Anantapur', address: 'Ramnagar, Anantapur', rating: '4.6', doctors: 18, next: 'Tomorrow, 9:30 AM', aarogyasri: false },
  { id: 'h4', name: 'RDT Hospital & Research Centre', city: 'Bathalapalli', district: 'Sri Sathya Sai', address: 'Bathalapalli, AP', rating: '4.5', doctors: 12, next: 'Today, 2:00 PM', aarogyasri: true },
  { id: 'h5', name: 'Sri Sai Multi Speciality Hospital', city: 'Anantapur', district: 'Anantapur', address: 'Kamalanagar, Anantapur', rating: '4.4', doctors: 15, next: 'Tomorrow, 10:00 AM', aarogyasri: false },
  { id: 'h6', name: 'Apollo Pharmacy & Clinic', city: 'Anantapur', district: 'Anantapur', address: 'Old Town, Anantapur', rating: '4.2', doctors: 8, next: 'Today, 4:00 PM', aarogyasri: false },
  { id: 'h7', name: 'Shree Hospitals', city: 'Anantapur', district: 'Anantapur', address: 'Aravind Nagar, Anantapur', rating: '4.6', doctors: 16, next: 'Today, 5:30 PM', aarogyasri: true },
  { id: 'h8', name: 'Carewell Women & Children Hospital', city: 'Anantapur', district: 'Anantapur', address: 'Brahmana Palli, Anantapur', rating: '4.8', doctors: 11, next: 'Tomorrow, 9:00 AM', aarogyasri: true },
  { id: 'h9', name: 'Vijaya Diagnostic Centre', city: 'Anantapur', district: 'Anantapur', address: 'Tadipatri Road, Anantapur', rating: '4.1', doctors: 9, next: 'Today, 3:15 PM', aarogyasri: false },
  { id: 'h10', name: 'Narayana Health Clinic', city: 'Anantapur', district: 'Anantapur', address: 'Saptagiri Circle, Anantapur', rating: '4.5', doctors: 14, next: 'Today, 12:00 PM', aarogyasri: true }
];
export const doctors = [{ id: 'd1', name: 'Dr. Suresh Kumar, MD', specialty: 'Cardiology', hospital: hospitals[0].name, experience: 18, fee: 400, languages: 'English, Telugu', rating: '4.8' }, { id: 'd2', name: 'Dr. Anitha Reddy, MBBS', specialty: 'General Medicine', hospital: hospitals[1].name, experience: 12, fee: 300, languages: 'Telugu, Hindi', rating: '4.7' }, { id: 'd3', name: 'Dr. Ravi Teja, MS', specialty: 'Orthopedics', hospital: hospitals[2].name, experience: 15, fee: 500, languages: 'English, Telugu', rating: '4.6' }];
