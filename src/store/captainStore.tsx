import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

type Location = {
    latitude: number;
    longitude: number;
    address: string;
    heading: number;
} | null;

interface CaptainStoreProps {
    user: any
    location: Location;
    setUser: (data: any) => void;
    onDuty: boolean;
    setLocation: (data: Location) => void;
    setOnDuty: (data: boolean) => void;
    clearCaptainData: () => void;

}

export const useCaptainStore = create<CaptainStoreProps>()(
    persist(
        (set) => ({
            user: null,
            location: null,
            onDuty: false,
            setUser: (data) => set({ user: data }),
            setLocation: (data) => set({ location: data }),
            setOnDuty: (data) => set({ onDuty: data }),
            clearCaptainData: () => set({ user: null, location: null, onDuty: false }),
        }),
        {
            name: 'captain-store',
            partialize: (state) => ({
                user: state.user,
            }),
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
);
