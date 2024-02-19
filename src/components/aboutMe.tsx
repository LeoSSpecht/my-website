import React from "react";
import { me_png } from "../utils/imageGetter";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { BiSolidFilePdf } from "react-icons/bi";

import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons/lib";

export const AboutMe = ({ id }: { id: string }): JSX.Element => {
  const imageSize = "14rem";
  const circleSize = "14rem";

  const tagStyle = {
    fontSize: "0.95rem",
    color: "white",
    height: "2em",
  } as React.CSSProperties;

  const logo = (
    text: string,
    Icon: IconType,
    redirect: string,
    iconSize: number = 14
  ): JSX.Element => {
    return (
      <a href={redirect} target="_blank" rel="noreferrer">
        <div className="flex my-2 not-phone:mx-3">
          <span
            style={tagStyle}
            className="flex-center bg-slate-700 px-5 rounded-s w-28"
          >
            {text}
          </span>
          <span
            style={tagStyle}
            className="flex-center bg-logo-background px-2 rounded-e"
          >
            <Icon color="rgb(224, 224, 224)" size={iconSize} />
          </span>
        </div>
      </a>
    );
  };

  const picture = (): JSX.Element => {
    return (
      <div
        className="rounded-full bg-slate-200 border-4 border-slate-300 flex justify-center items-center"
        style={{ width: circleSize, height: circleSize }}
      >
        <img
          alt="me"
          src={`${process.env.PUBLIC_URL + me_png}`}
          style={{ width: imageSize, height: imageSize, position: "absolute" }}
          className="rounded-full"
        ></img>
      </div>
    );
  };
  return (
    <div
      id={id}
      className="w-auto px-5 py-12 bg-gradient-to-r from-[#F5F7FA] to-[#B8C6DB]"
    >
      <div className="flex-column not-phone:flex-evenly">
        <div className="px-2 not-phone:ml-auto ">{picture()}</div>
        <div className="text-lg px-2 py-3 text-center max-w-[350px] not-phone:mr-auto">
          <p className="leading-relaxed mb-3">
            I am an undergraduate Computer Science student at Michigan State.
          </p>
          <p>
            My goal is to create cools things and make people's life simpler and
            easier with tech.
          </p>
        </div>
      </div>
      <div className="pt-10 grid-2-colums not-phone:flex-center">
        {logo("Github", BsGithub, "https://github.com/LeoSSpecht")}
        {logo(
          "Resume",
          BiSolidFilePdf,
          "https://drive.google.com/file/d/1SeZbQ4J2o_YVWPAm1Vx-ouTGMjxgH-0K/view?usp=share_link",
          18
        )}
        {logo("LinkedIn", BsLinkedin, "https://www.linkedin.com/in/leospecht/")}
        {logo("Email", MdEmail, "mailto: leo.s.specht@gmail.com")}
      </div>
    </div>
  );
};
