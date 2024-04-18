import React from "react";
import projects from "./projectsContent.json";
import { BsGithub } from "react-icons/bs";
import { GoTab } from "react-icons/go";

interface TyleProps {
  title: string;
  text: Array<string>;
  src: string;
  redirectGitHub?: string;
  redirectGo?: string;
  color?: string;
}

const ProjectTyle = ({
  title,
  text,
  src,
  redirectGitHub,
  redirectGo,
  color = "standard",
}: TyleProps) => {
  const colorMap = {
    standard: "bg-slate-300",
    spartan: "bg-spartan-tutors",
    spartan2: "bg-white",
  };

  return (
    <div className="shadow-center transition hover:scale-105 hover:shadow-blue-500/40 rounded-lg mx-4 my-3 w-52">
      <div
        className={`w-full h-24 p-1 rounded-t-lg flex-center ${colorMap[color]}`}
      >
        <img
          alt="projectImage"
          className="rounded-t-lg h-full w-full object-contain"
          src={`${process.env.PUBLIC_URL + src}`}
        />
      </div>
      <div className="p-3 w-full h-56 bg-slate-700 rounded-b-lg text-white text-center ">
        <h1 className="font-bold text-lg pb-2">{title}</h1>
        {text.map((t) => {
          return <p className="text-sm">{t}</p>;
        })}
        <div className="mt-3 flex-center">
          {redirectGitHub ? (
            <a
              className="mx-5"
              href={redirectGitHub}
              rel="noreferrer"
              target="_blank"
            >
              <BsGithub size={27} />
            </a>
          ) : null}
          {redirectGo ? (
            <a
              className="mx-5"
              href={redirectGo}
              rel="noreferrer"
              target="_blank"
            >
              <GoTab size={27} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ id }: { id: string }) => {
  return (
    <div id={id} className="mx-12 my-5">
      <h1 className="font-bold text-4xl m-5 flex-center not-phone:justify-start ">
        Projects
      </h1>
      <div className="flex-center">
        <div className=" not-phone: flex-auto-columns max-w-5xl">
          {projects.map((data: TyleProps) => {
            return (
              <ProjectTyle
                title={data.title}
                text={data.text}
                src={data.src}
                redirectGitHub={data.redirectGitHub}
                redirectGo={data.redirectGo}
                color={data.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
