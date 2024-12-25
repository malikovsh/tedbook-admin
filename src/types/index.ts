import { UserRole } from '@/constants/enum';

export interface LoginBodyType {
  username: string;
  password: string;
}

export interface LoginResponseType {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
    name: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface UserTypeById {
  user: any;
  id: string;
  username: string;
  name: string;
  role: string;
  salary: number | null;
  shift: number | null;
  isBoss: boolean;
  assistants: object;
  isActive: boolean;
}

export interface UserType {
  user: any;
  _id: string;
  username: string;
  name: string;
  salary: number | null;
  role: string;
  shift: number | null;
  assistants: object;
  isActive: boolean;
  profilePic?: string;
}

export interface ResponsePaginationType {
  currentPage: number;
  totalPages: number;
}

export interface GetAllUsersByRoleResponseType extends ResponsePaginationType {
  totalUsers: number;
  users: UserType[];
}

export interface GetAllUsersResponseType {
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  users: UserType[];
}

export interface UpdateUserType {
  name: string;
  username: string;
  shift: number | null;
}

export interface CreateUserBodyType {
  name: string;
  username: string;
  password: string;
  role: keyof typeof UserRole;
  salary: number;
  isBoss?: boolean;
  isHead?: boolean;
  shift: number | null;
}
