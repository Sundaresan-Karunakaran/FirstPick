import * as React from "react";
import { Link } from "react-router-dom";
import "./HeroImage.css"
function HeroImage({heroId, displayName, name}) {
    
    let tempVar = name.split("_")
    let imageName;
    if(tempVar.length == 4){
        imageName = tempVar[3]
    }
    else if (tempVar.length == 5 ) {
        imageName = tempVar[3]+"_"+tempVar[4]
    }
    else {
        imageName = "keeper_of_the_light"
    }

    const textLength = displayName.length;
    let dynamicFontSize = "15px";

    if (textLength > 18) {
        dynamicFontSize = "7px";
    } else if (textLength >= 13) {
        dynamicFontSize = "8.5px";
    } else if (textLength >=10) {
        dynamicFontSize = "10.5px"
    }
    console.log(displayName)
    const imageURL = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/"+imageName+".png"
    return (
        <Link to={`/hero/${heroId}/${imageName}`} >
        <div className="heroContainer" >
            <img
                className="herocard"
                src={imageURL}
                alt={displayName}
            />
            <span className="hero-name-overlay" style={{ fontSize: dynamicFontSize }}>{displayName.toUpperCase()}</span>
        </div>
        </Link>
    )
}


export default HeroImage;