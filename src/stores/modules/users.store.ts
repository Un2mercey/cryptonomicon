import { Ref, ref } from 'vue';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { IUser } from '@/@interfaces';

interface State {
    currentUser: IUser;
    availableUsers: IUser[];
}

interface Getters {}

interface Actions {
    setUser: (user: IUser) => void;
    fetchUsers: () => Promise<IUser[]>;
}

type UsersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type UsersStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'users';
export const useUsersStore: UsersStoreDefinition = defineStore(STORE_NAME, () => {
    const usersMock = [
        {
            firstName: 'Arseniy',
            lastName: 'Markov',
            email: 'zamberg42@gmail.com',
        },
        {
            firstName: 'Alibaba',
            lastName: 'Zurabovich',
            email: 'alibaba.zurabovich@gmail.com',
        },
        {
            firstName: 'Jason',
            lastName: 'Momoa',
            email: 'jason-momoa@gmail.com',
        },
    ];

    const currentUser: Ref<IUser> = ref(null);

    const availableUsers: Ref<IUser[]> = ref([]);

    function setUser(user: IUser): void {
        currentUser.value = user;
    }

    function fetchUsers(): Promise<IUser[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.info('Users fetched');
                availableUsers.value = usersMock;
                resolve(usersMock);
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
