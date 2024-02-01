import initialDogs, { Dog } from '@formidable/dogs';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type Context = {
    dogs: Dog[];
    reloadDogs: () => void;
    setActiveDog: (dog: Dog) => void;
    updateDog: (field: keyof EditableDogFields, value: string) => void;
    activeDog?: Dog;
};

export type EditableDogFields = Pick<Dog, 'breed' | 'color' | 'description' | 'name'>;

export const DogsContext = createContext({} as Context);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
    // We need to create new references else the update will persist
    const [dogs, setDogs] = useState(initialDogs.map(d => ({ ...d })));
    const [activeDog, setActiveDog] = useState<Dog>();

    const reloadDogs = useCallback((): void => {
        setDogs(initialDogs.map(d => ({ ...d })));
    }, []);

    const updateDog = useCallback(
        (field: keyof EditableDogFields, value: string): void => {
            if (!activeDog) {
                throw Error('No dogs here :(');
            }

            setActiveDog(prevState => {
                if (!prevState) {
                    throw Error('No dog to update');
                }

                return {
                    ...prevState,
                    [field]: value
                };
            });

            setDogs(prevState => {
                const dogIndex = dogs.findIndex(d => d.key === activeDog.key);

                if (dogIndex < 0) {
                    return prevState;
                }

                prevState[dogIndex][field] = value;

                return prevState;
            });
        },
        [activeDog, dogs]
    );

    return (
        <DogsContext.Provider value={{ activeDog, dogs, reloadDogs, setActiveDog, updateDog }}>{children}</DogsContext.Provider>
    );
};

export const useDogs = () => useContext(DogsContext);
