import React from "react"
import json from "./experienceContent.json";
import ItemData from "./experienceContent";
import "./timeline.css"

type TimelineItemProps = {
    isFirst?: boolean;
    isHeader?: boolean;
    itemData?: ItemData;
}

const TimelineItem = ({ 
        isFirst, isHeader, itemData    
    }:TimelineItemProps): JSX.Element => {

    if(isFirst){
        return (
            <div className="timeline is-centered">
                <div className="timeline-item">
                    <div className="timeline-marker"/>
                </div>
            </div>
        )
    }

    if(isHeader){
        return (
            <div>
                <h1 className="font-bold text-4xl m-5 flex-center not-phone:justify-start">Experiences</h1>
                <div className="timeline is-centered">
                    <div className="timeline-header">
                        2023
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="timeline-item">
            <div className="timeline-marker is-image is-46x46">
                <a href={itemData!.redirectLink} target="_blank" rel="noreferrer" className="flex-center">
                    <img 
                        alt="companyLogo"
                        src={`${process.env.PUBLIC_URL + itemData!.imagePath!}`}
                        className="is-46x46"
                    ></img>
                </a>
            </div>

            <div className="timeline-content">
                <p className="item-header text-sm">{itemData!.itemHeader}</p>
                <h1 className="item-title text-xl">{itemData!.itemTitle}</h1>
                <p className="item-subtitle text-sm">{itemData!.itemSubtitle}</p>
                <div>
                    {itemData!.itemContent!.map(content => {
                        return (<p className="item-content text-base">{content}</p>)
                    })}
                </div>
            </div>
        </div>

    )
}

export const Experiences = ({id}:{id:string}): JSX.Element => {
    return (
        <div id={id} className="timeline is-centered mx-6 not-phone:mx-12">
            <TimelineItem isHeader={true}/>
            <TimelineItem isFirst={true}/>
            {
                json.map((content) => {
                    return <TimelineItem itemData={content}/>
                })
            }
        </div>
    )

}