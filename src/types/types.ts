export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt:string;
  updatedAt:string;
  image: string;
}

export interface TableColumn {
  label: string;
  key: keyof Category; 
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  lastLogout: string;
  plans: Plan[];
}
