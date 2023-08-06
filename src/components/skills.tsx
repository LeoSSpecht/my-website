import React from "react";
import { me_png } from "../utils/imageGetter";

interface skillCardProp {
    name: string;
    src: string;
}

const SkillCard = ({name, src} : skillCardProp): JSX.Element => {
    const itemStyle = {
        flex: `0 0 calc(${100/6}% -20px)`,
        // background: 'teal',
        // padding: '20px',
        margin: '10px',
      }
    
    return (
        <div style={itemStyle} className="flex-center rounded-md shadow px-4 py-3 w-fit">
            <img className="w-6 h-6 mx-2" src={`${process.env.PUBLIC_URL + src}`} />
            <span className="mx-2 text-slate-500">{name}</span>
        </div>
    )
}

export const Skills = (): JSX.Element => {

    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      } as React.CSSProperties



      return (
        <div className="mx-12 my-5">
            <h1 className="font-bold text-4xl m-5 flex item-center">Skills</h1>
            <div className="flex-center">
                <div style={containerStyle} className="max-w-2xl">
                    <SkillCard name="Firebase" src={me_png}/>
                    <SkillCard name="Python" src={me_png}/>
                    <SkillCard name="Swift" src={me_png}/>
                    <SkillCard name="C++" src={me_png}/>
                    <SkillCard name="JavaScript" src={me_png}/>
                    <SkillCard name="SQL" src={me_png}/>
                    <SkillCard name="Google Cloud" src={me_png}/>

                </div>
            </div>

        </div>
      )

}