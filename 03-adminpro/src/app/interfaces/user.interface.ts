import { User } from "../models/user.model";

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password2: string;
    terms: boolean;
}

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface ProfileForm {
    name: string;
    email: string;
}

export interface LoadUsers{
    ok: boolean;
    total: number;
    users: User[];
}