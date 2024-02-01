import { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootNavigatorParams = {
    Home: undefined;
    Detail: undefined;
};

export type RootNavigatorNavigationProp<S extends keyof RootNavigatorParams> = NativeStackNavigationProp<RootNavigatorParams, S>;
export type RootNavigatorRouteProp<S extends keyof RootNavigatorParams> = RouteProp<RootNavigatorParams, S>;

export type RootNavigatorProps<S extends keyof RootNavigatorParams> = {
    navigation: RootNavigatorNavigationProp<S>;
    route: RootNavigatorRouteProp<S>;
};

const Stack = createNativeStackNavigator<RootNavigatorParams>();

const RootNavigator = () => (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dogs' }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
);

export default RootNavigator;
