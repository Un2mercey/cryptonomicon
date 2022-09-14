import { find } from 'lodash';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { ref } from 'vue';
import { IUser } from '@/@interfaces';
import { Nullable, Undefined } from '@/@types';
import { usersMock } from '@/mocks';
import { StoreNames } from '@/utils';

interface State {
    currentUser: Nullable<IUser>;
    availableUsers: IUser[];
}

interface Getters {}

interface Actions {
    setUser: (userId: number) => void;
    fetchUsers: () => Promise<void>;
}

type SD = StoreDefinition<StoreNames.USERS, State, Getters, Actions>;
export type UsersStore = Readonly<Store<StoreNames.USERS, State, Getters, Actions>>;

export const useUsersStore: SD = defineStore(StoreNames.USERS, () => {
    const currentUser = ref<Nullable<IUser>>(null);
    const availableUsers = ref<IUser[]>([]);

    function setUser(userId: number): void {
        const foundedUser: Undefined<IUser> = find(availableUsers.value, { id: userId });
        foundedUser && (currentUser.value = foundedUser);
    }

    function fetchUsers(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                availableUsers.value = [...usersMock];
                resolve();
            }, 3000);
        });
    }

    return {
        currentUser,
        availableUsers,
        setUser,
        fetchUsers,
    };
});
