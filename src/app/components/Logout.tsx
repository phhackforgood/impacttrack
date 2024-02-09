'use client';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { TbLogout2 } from "react-icons/tb";


import React from 'react'

const SideBarIcon = ({ icon, text }: any) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)

function Logout() {
    const router = useRouter();
    const [error, setError] = React.useState('');
    const onLogout = async () => {
        try {
            deleteCookie('pb_auth');
            localStorage.clear();
            router.push('/auth/login');
        } catch (err) {
            setError('Failed to log out');
        }
    };

    return (
        <div onClick={onLogout}>
            <SideBarIcon icon={<TbLogout2  size="28" />} text="Logout" />
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default Logout