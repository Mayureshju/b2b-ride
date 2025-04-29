import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { WSProvider } from '@/service/WSProvider'

const RootLayout = () => {
    return (
        <WSProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='captain/auth' />
                <Stack.Screen name='captain/home' />
                <Stack.Screen name='captain/otp' />
                <Stack.Screen name='captain/personaldetails' />
                <Stack.Screen name='captain/profile' />
                <Stack.Screen name='captain/my-rides' />
                <Stack.Screen name='captain/ride-details/[id]' />

            </Stack>
        </WSProvider>
    )
}

export default gestureHandlerRootHOC(RootLayout)