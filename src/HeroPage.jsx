import * as React from "react";
import { useParams } from "react-router-dom";
import "./HeroPage.css"
import HeroTable from "./assets/HeroTable";
import { HERO_MATCHUP_INFO, ALL_HERO_INFO, HERO_HYPE_INFO } from "./utils/stratzQueries";
import { getHeroImageName } from "./assets/HeroImage";
import { useQuery } from '@apollo/client/react';
import Header from "./assets/Header";
import PageAnimation from "./assets/PageAnimation";

function HeroPage() {
    const {heroID, heroName} = useParams();
    let temp = heroName.replaceAll("_", " ");
    const heroDisplayName = temp.toUpperCase()

    const { loading, error, data, refetch } = useQuery(HERO_MATCHUP_INFO, {
            variables: { heroId: Number(heroID) },
            notifyOnNetworkStatusChange: true,
        });
    const { data: heroData, loading: heroesLoading, error: heroesError } = useQuery(ALL_HERO_INFO);

    const { data: heroHypeData, loading: heroHypeLoading, error: heroHypeerror} = useQuery(HERO_HYPE_INFO, {
        variables: {heroId: Number(heroID)},
         notifyOnNetworkStatusChange: true,
    })

    const heroLookup = Object.fromEntries(
        (heroData?.constants?.heroes ?? []).map((hero) => [
            hero.id,
            { ...hero, imageName: getHeroImageName(hero.name) }
        ])
    );
    const matchupHeroes = data?.heroStats?.heroVsHeroMatchup?.advantage ?? [];
    const againstHeroes = matchupHeroes.flatMap((hero) =>
        (hero.vs ?? []).map((matchup) => ({
            ...matchup,
            heroId: matchup.heroId2,
            matchCount: matchup.matchCount ?? hero.matchCountVs
        }))
    );
    const withHeroes = matchupHeroes.flatMap((hero) =>
        (hero.with ?? []).map((matchup) => ({
            ...matchup,
            heroId: matchup.heroId2,
            matchCount: matchup.matchCount ?? hero.matchCountWith
        }))
    );

    if ((loading || heroesLoading) && !data) {
        return <div className="matchupState">Loading matchups...</div>;
    }

    if (error || heroesError) {
        return (
            <div className="matchupState">
                <h3>Error loading matchups</h3>
                <p>{(error ?? heroesError).message}</p>
                <button onClick={() => refetch()}>Try Again</button>
            </div>
        );
    }

    // React.useEffect(() => {console.log(heroHypeData)},[heroHypeData])
    
    function filterHypeData() {
        const text = heroHypeData?.constants?.hero?.language?.hype ?? "";
        const regex = /(<([^>]+)>)/gi;
        const result = text.replace(regex, "")
        return result
    }
    

    return (
        <PageAnimation><Header></Header>
                <div className="mainBox">
            <div id="effectBox"></div>
            <div className="leftBox videoBox">
                <div className="heroTitle">{heroDisplayName}</div>
                <div className="underlineBox">
                    <div className="line"></div>
                    <p className="heroId">HERO ID {heroID}</p>
                    <div className="line"></div>
                </div>
                <div className="tableContainerBox">
                    <div className="tableBox">
                        <div className="tableTitle">
                            <span>Against</span>
                            <small>Heroes that counter this hero</small>
                        </div>
                        <HeroTable heroes={againstHeroes} heroLookup={heroLookup} mode="against" />
                    </div>
                    <div className="tableBox">
                        <div className="tableTitle">
                            <span>With</span>
                            <small>Heroes that work well with this hero</small>
                        </div>
                        <HeroTable heroes={withHeroes} heroLookup={heroLookup} mode="with" />
                    </div>
                </div>
                
            </div>
            
            <div id="borderLeft" aria-hidden="true"></div>

            <div className="rightBox videoBox">
                <video className="heroVideo" poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.png`} autoPlay preload="auto" loop playsInline>
                    <source type="video/mp4; codecs='hvc1'" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.mov`} />
                    <source type="video/webm" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.webm?undefined`} />
                    <img src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.png`} alt={`Image of ${heroName}`}></img>
                </video>
                <div id="bottomText"><b style={{textAlign:'center'}}>How to play {heroHypeData?.constants.hero.displayName}?</b>{filterHypeData()}</div>
            </div>
            
        </div></PageAnimation>

    )
}



export default HeroPage