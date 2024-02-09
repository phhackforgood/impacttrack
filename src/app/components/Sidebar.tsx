import { BsPlus, BsGearFill } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { PiFireSimple } from "react-icons/pi";
import { MdOutlineQueryStats } from "react-icons/md";
import Logout from './Logout';
import Link from 'next/link';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 p-0 m-0 flex flex-col bg-white text-black shadow">
            <Divider />
            <Link href="/"><SideBarIcon icon={<IoHomeOutline size="28" />} text="Home" /></Link>
            <Link href="/form"><SideBarIcon icon={<BsPlus size="28" />} text="Submit Form" /></Link>
            <Link href="/"><SideBarIcon icon={<PiFireSimple size="28" />} text="Trending" /></Link>
            <Link href="/"><SideBarIcon icon={<MdOutlineQueryStats size="28" />} text="Statistics" /></Link>
            <Link href="/profile"><SideBarIcon icon={<CgProfile size="28" />} text="Profile" /></Link>
            <Logout />
            <Divider /> 
            <Link className="mt-auto mb-4" href="/"><SideBarIcon icon={<BsGearFill size="28" />} text="Settings" /></Link>
        </div >
    )
};

const SideBarIcon = ({ icon, text }: any) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)

const Divider = () => <hr className="sidebar-hr bg-black" />;

export default SideBar;