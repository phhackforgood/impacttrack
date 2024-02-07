'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

function LoginPage() {
    const route = useRouter();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');

    const onSubmit = async (event : React.FormEvent) => {
        event.preventDefault();

        try {
            const form = { email, password };
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                setError('Failed to authenticate user');
                return;
            };
            const data = await response.json();
            if (data?.token) {
                route.push('/');
            } else {
                setError('Failed to authenticate user');
            }
        } catch (err) {
            setEmail('Failed to authenticate user');
        }
    };

    return (
        <div>
           
        </div>
    )
}

export default LoginPage