import React from "react";
import { ImageRefPath } from "../utils/imageGetter";

interface skillCardProp {
  name: string;
  src: string;
}

const SkillCard = ({ name, src }: skillCardProp): JSX.Element => {
  const itemStyle = {
    flex: `0 0 calc(${100 / 6}% -20px)`,
    margin: "10px",
  };

  return (
    <div
      style={itemStyle}
      className="flex-center rounded-md shadow px-4 py-3 w-fit"
    >
      <img
        alt="logo"
        className="w-6 object-contain mr-2"
        src={`${process.env.PUBLIC_URL + src}`}
      />
      <span className="ml-2 text-slate-500">{name}</span>
    </div>
  );
};

export const Skills = ({ id }: { id: string }): JSX.Element => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  } as React.CSSProperties;

  return (
    <div id={id} className="mx-12 my-5">
      <h1 className="font-bold text-4xl m-5 flex-center not-phone:justify-start">
        Skills
      </h1>
      <div className="flex-center">
        <div style={containerStyle} className="max-w-2xl">
          <SkillCard name="Firebase" src={ImageRefPath.firebase} />
          <SkillCard name="Python" src={ImageRefPath.python} />
          <SkillCard name="Swift" src={ImageRefPath.swift} />
          <SkillCard name="C++" src={ImageRefPath.cpp} />
          <SkillCard name="JavaScript" src={ImageRefPath.js} />
          <SkillCard name="SQL" src={ImageRefPath.sql} />
          <SkillCard name="Google Cloud" src={ImageRefPath.gc} />
        </div>
      </div>
    </div>
  );
};
