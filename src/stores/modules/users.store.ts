import { find } from 'lodash';
import { Store, StoreDefinition, defineStore } from 'pinia';
import { ref } from 'vue';
import { Nullable, Undefined } from '@/@types';
import { User } from '@/@interfaces';
import { StoreIds } from '@/stores';
import { usersMock } from '@/mocks';

interface State {
    currentUser: Nullable<User>;
    availableUsers: User[];
}

interface Getters {}

interface Actions {
    setUser: (userId: number) => void;
    fetchUsers: () => Promise<void>;
}

type SD = StoreDefinition<StoreIds.USERS, State, Getters, Actions>;
export type UsersStore = Readonly<Store<StoreIds.USERS, State, Getters, Actions>>;

export const useUsersStore: SD = defineStore(StoreIds.USERS, () => {
    const currentUser = ref<Nullable<User>>(null);
    const availableUsers = ref<User[]>([]);

    function setUser(userId: number): void {
        const foundedUser: Undefined<User> = find(availableUsers.value, { id: userId });
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
