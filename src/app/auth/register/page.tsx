'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

function RegisterPage() {
    const route = useRouter();
    const [username, setUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');

    const onSubmit = async (event : React.FormEvent) => {
        event.preventDefault();

        try {
            const form = { username, email, password };
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            console.log(response);
            if (!response.ok) {
                setError('Failed to register user');
                return;
            };
            const data = await response.json();
            console.log(data);
            route.push('/auth/login');
        } catch (err) {
            setEmail('Failed to register user');
        }
    };

    return (
       <div></div>
    )
}

export default RegisterPage