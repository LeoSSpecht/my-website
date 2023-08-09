import * as React from 'react';
import { headerBackgroundImage } from '../utils/imageGetter';
import '../index.css'

const Header = () => {

    const backimagestyle = {
        background: `url(${process.env.PUBLIC_URL + headerBackgroundImage}) center / cover`,
        position: 'relative',
    }  as React.CSSProperties;

    const navStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        padding: "0.5rem 1rem",
        color: "white",
      } as React.CSSProperties;

    const itemStyle = {
            display: "block",
            width: "100%",
            fontSize: '18px'
    }
    
    const liStyle = {
        margin: "0 1rem"
    }

    const ulStyle = {
        display: 'flex',
        padding: '0'
    }

    const navbar = () => {
        return(
            <nav  style={navStyle}>
                <div className=''>
                    <a href="/" className="font-extrabold text-xl">Leonardo Specht</a>
                </div>
                <div  className='m-0 hidden not-phone:block ml-auto'>
                    <ul style={ulStyle} className="">
                    <li style={liStyle}>
                        <a style={itemStyle} href="#aboutMe">About Me</a>
                    </li>
                    <li style={liStyle} >
                    <a style={itemStyle} href="#experiences">My Work</a>
                    </li>
                    <li style={liStyle}>
                        <a style={itemStyle} href="#skills">Skills</a>
                    </li>
                    <li style={liStyle}>
                        <a style={itemStyle} href="#projects">Projects</a>
                    </li>
                    </ul>

                </div>
        </nav>
        )


    }

    return (
        <header className="App-header">
                <section className="min-h-[100vh]" style={backimagestyle}>
                    {navbar()}
                    <div>
                    <div style={{zIndex:1, position:'absolute', top:'40%'}} className="">
                        <p className="text-5xl leading-normal font-extrabold text-white items-center mx-10">Hey there!<br/>I'm Leo.</p>
                    </div>
                    </div>

                </section>
        </header>

    );
};

export default Header;
