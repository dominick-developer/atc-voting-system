export type MockUser = {
  id: string;
  admissionNumber: string;
  yearOfBirth: string;
  secondarySchool: string;
  middleName: string;
  fullName: string;
  email: string;
  role: "STUDENT" | "CANDIDATE" | "ELECTORAL_COMMISSION" | "ELECTION_OFFICER" | "OBSERVER" | "SYSTEM_ADMIN";
  programme: string;
  class: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "u1",
    admissionNumber: "ATC/2024/0001",
    yearOfBirth: "2003",
    secondarySchool: "Arusha Secondary School",
    middleName: "Peter",
    fullName: "John Doe",
    email: "john.doe@atc.ac.tz",
    role: "STUDENT",
    programme: "Computer Science",
    class: "NTA Level 5 - CS",
  },
  {
    id: "u2",
    admissionNumber: "ATC/2024/0002",
    yearOfBirth: "2002",
    secondarySchool: "Moshi Technical Secondary",
    middleName: "Grace",
    fullName: "Jane Mwangi",
    email: "jane.mwangi@atc.ac.tz",
    role: "CANDIDATE",
    programme: "Electrical Engineering",
    class: "NTA Level 6 - EE",
  },
  {
    id: "u3",
    admissionNumber: "ATC/2024/0003",
    yearOfBirth: "1990",
    secondarySchool: "N/A",
    middleName: "Admin",
    fullName: "Admin User",
    email: "admin@atc.ac.tz",
    role: "SYSTEM_ADMIN",
    programme: "Administration",
    class: "N/A",
  },
  {
    id: "u4",
    admissionNumber: "ATC/2024/0004",
    yearOfBirth: "1985",
    secondarySchool: "N/A",
    middleName: "Commission",
    fullName: "Commission Member",
    email: "commission@atc.ac.tz",
    role: "ELECTORAL_COMMISSION",
    programme: "Administration",
    class: "N/A",
  },
  {
    id: "u5",
    admissionNumber: "ATC/2024/0005",
    yearOfBirth: "1988",
    secondarySchool: "N/A",
    middleName: "Officer",
    fullName: "Officer Mwita",
    email: "officer@atc.ac.tz",
    role: "ELECTION_OFFICER",
    programme: "Administration",
    class: "N/A",
  },
];