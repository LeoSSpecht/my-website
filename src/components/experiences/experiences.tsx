import React from "react"
import { me_png } from "../../utils/imageGetter";
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
                <h1 className="font-bold text-4xl m-5 flex  item-center">Experiences</h1>
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
                <img 
                    src={`${process.env.PUBLIC_URL + itemData!.imagePath!}`}
                    className="rounded-full"
                ></img>
            </div>
            <div className="timeline-content">
                <p className="item-header">{itemData!.itemHeader}</p>
                <h1 className="item-title">{itemData!.itemTitle}</h1>
                <p className="item-subtitle">{itemData!.itemSubtitle}</p>
                <div>
                    {itemData!.itemContent!.map(content => {
                        return (<p className="item-content">{content}</p>)
                    })}
                </div>
            </div>
        </div>

    )
}

export const Experiences = (): JSX.Element => {
    const contentList: Array<ItemData> = json as ItemData[];

    return (
        <div className="timeline is-centered mx-12">
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