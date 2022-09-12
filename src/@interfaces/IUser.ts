import { Nullable } from '@/@types';

export type IUser = Nullable<{
    firstName: string;
    lastName: string;
    email: string;
}>;
