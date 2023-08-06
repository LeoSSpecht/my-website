import React from "react";
import { me_png } from "../utils/imageGetter";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { BiSolidFilePdf } from "react-icons/bi";

import { MdEmail } from "react-icons/md"
import { IconType } from "react-icons/lib";


export const AboutMe = (): JSX.Element => {

    const imageSize = 170;
    const circleSize = 170;

    const tagStyle = {
        fontSize: '0.75rem',
        color: 'white',
        height: '2em'
    } as React.CSSProperties

    const logo = (text:string, Icon: IconType, iconSize: number = 14): JSX.Element => {
        return(
            <div className="flex my-2 not-phone:mx-3">
                <span style={tagStyle} className="flex-center bg-slate-700 px-5 rounded-s w-24">{text}</span>
                <span style={tagStyle} className="flex-center bg-logo-background px-2 rounded-e">
                    <Icon color="rgb(224, 224, 224)" size={iconSize}/>
                </span>
            </div>
        )
    }

    const picture = (): JSX.Element => {
        return(
            <div className="rounded-full bg-slate-200 border-4 border-slate-300 flex justify-center items-center" style={{ width: circleSize, height: circleSize }}>
                <img 
                src={`${process.env.PUBLIC_URL + me_png}`}
                style={{ width: imageSize, height: imageSize ,position:"absolute"}}
                className="rounded-full"
                ></img>
            </div>
        )

    }
    return (
        
        <div className="w-auto px-5 py-12 bg-gradient-to-r from-[#F5F7FA] to-[#B8C6DB]">
            <div className="flex-column not-phone:flex-evenly">
                <div className="px-2 not-phone:ml-auto ">
                    {picture()}
                </div>
                <div className="px-2 py-3 text-center max-w-[350px] not-phone:mr-auto  ">
                    <p className="leading-relaxed mb-3">I am a undergraduate Computer Science student at Michigan State.</p>
                    <p>My goal is to create cools things and make people's life simpler and easier with tech.</p>
                </div>
            </div>
            <div className="pt-10 grid-2-colums not-phone:flex-center">
                {logo("Github", BsGithub)}
                {logo("Resume", BiSolidFilePdf, 18)}
                {logo("LinkedIn", BsLinkedin)}
                {logo("Email", MdEmail)}
            </div>
        </div>
    )
}