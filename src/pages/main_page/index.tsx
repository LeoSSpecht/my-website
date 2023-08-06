import React from "react";
import Header from "../../components/header";
import {Footer} from "../../components/footer";
import {AboutMe} from "../../components/aboutMe";
import {Experiences} from "../../components/experiences/experiences";
import {Skills} from "../../components/skills";


export const MainPage = () => {
    return (
        <div className="App">
            <Header/>
            <AboutMe/>
            <Experiences/>
            <Skills/>
            <Footer/>
        </div>
    );
}