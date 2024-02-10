import Link from "next/link";
import Image from "next/image";
import db from "@/db";
import { RecordModel } from "pocketbase";

interface VolunterCardProps {
    image: string;
    formId: string;
}

const VolunteerCard = async (props: VolunterCardProps) => {
    const { image, formId } = props;
    const form = await db.getForm(formId);
    console.log(form);
    const username = await db.client.collection("users").getOne(form.user);
    const imageUrl = db.client.files.getUrl(form, image);
    const hours = form.hours;

    return (
        <div className="flex flex-col items-center bg-white hover:shadow-xl font-Dmsans w-60 rounded-xl mr-auto ">
            <Image className=" rounded-md mx-auto" src={imageUrl} alt="Profile picture" width={300} height = {300}/>
            <h2 className="text-2xl font-semibold ml-4 mr-auto mt-2">
                {username.name ? username.name : "Anonymous"}
            </h2>
            <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap pl-4 w-full">{form.content}</h3>
            <h3 className=" text-base">Hours Volunteered: {hours}</h3>
        </div>
    );
}

export default VolunteerCard