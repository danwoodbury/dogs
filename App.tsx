/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DogsProvider } from './src/lib/context/DogContext';
import RootNavigator from './src/navigators/RootNavigator';

function App(): React.JSX.Element {
    return (
        <DogsProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </DogsProvider>
    );
}

export default App;
