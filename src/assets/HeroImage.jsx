import * as React from "react";
import { Link } from "react-router-dom";
import "./HeroImage.css"

export function getHeroImageName(name) {
    return name?.split("_").slice(3).join("_") || "keeper_of_the_light";
}

export function getHeroImageUrl(name) {
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${getHeroImageName(name)}.png`;
}

function HeroImage({heroId, displayName, name, onImageSettled}) {
    const imageName = getHeroImageName(name);
    const imageSettled = React.useRef(false);

    const textLength = displayName.length;
    let dynamicFontSize = "15px";

    if (textLength > 18) {
        dynamicFontSize = "7px";
    } else if (textLength >= 13) {
        dynamicFontSize = "8.5px";
    } else if (textLength >=10) {
        dynamicFontSize = "10.5px"
    }
    const imageURL = getHeroImageUrl(name)
    const handleImageSettled = () => {
        if (imageSettled.current) return;
        imageSettled.current = true;
        onImageSettled?.(heroId);
    };

    return (
        <Link to={`/hero/${heroId}/${imageName}`} >
        <div className="heroContainer" >
            <img
                className="herocard"
                src={imageURL}
                alt={displayName}
                onLoad={handleImageSettled}
                onError={handleImageSettled}
            />
            <span className="hero-name-overlay" style={{ fontSize: dynamicFontSize }}>{displayName.toUpperCase()}</span>
        </div>
        </Link>
    )
}


export default HeroImage;