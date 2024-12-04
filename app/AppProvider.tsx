"use client";
import { clientAccessToken } from '@/lib/http';
import { useState } from 'react';

export default function AppProvider({ children, initialAccessToken = '' }: { children: React.ReactNode, initialAccessToken?: string }) {
    useState(() => {
        if (typeof window !== 'undefined') {
            clientAccessToken.value = initialAccessToken
        }
    }
    )
    return (
        <>
            {children}
        </>
    );
}