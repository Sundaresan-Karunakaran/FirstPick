import * as React from "react";
import { useParams } from "react-router-dom";
import "./HeroPage.css"
function HeroPage() {
    const {heroID, heroName} = useParams();
    let temp = heroName.replaceAll("_", " ");
    const heroDisplayName = temp.toUpperCase()
    return (
        <div className="mainBox">
            <div id="effectBox"></div>
            <div className="videoBox">
                <div style={{paddingTop:"70px"}}>{heroDisplayName}</div>
                <div className="underlineBox">
                    <div className="line"></div>
                    <p style={{fontSize:"20px",padding:"10px"}}>{heroID}</p>
                    <div className="line"></div>
                </div>
                <div className="tableContainerBox">
                    <div>hello</div>
                    <div>hello2</div>
                </div>
                
            </div>
            <div className="videoBox">
                <video style={{width:"100%", height:"100%", objectFit:'cover'}} poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.png`} autoPlay preload="auto" loop playsInline>
                <source type="video/mp4; codecs='hvc1'" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.mov`} />
                <source type="video/webm" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.webm?undefined`} />
                <img src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.png`} alt={`Image of ${heroName}`}></img>
                </video>
            </div>
            {/* <h1>{heroDisplayName}</h1>
             */}
        </div>
    )
}



export default HeroPage