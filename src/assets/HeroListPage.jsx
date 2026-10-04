import * as React from "react";
import "./HeroListPage.css"
import HeroImage from "./HeroImage";
import { useQuery } from '@apollo/client/react';
import {ALL_HERO_INFO} from '../utils/stratzQueries.js'
import { useEffect, useState } from "react";
function HeroListPage() {

    const { loading, error, data, refetch } = useQuery(ALL_HERO_INFO, {
        variables: { limit: 10, offset: 0 },
        notifyOnNetworkStatusChange: true,
    });

    const [strengthHeroes, setStrengthHeroes] = useState([])
    const [agilityHeroes, setAgilityHeroes] = useState([])
    const [intelligenceHeroes, setIntelligenceHeroes] = useState([])
    const [universalHeroes, setUniversalHeroes] = useState([])
    useEffect(() => {
        if (!data?.constants?.heroes) return;

        const str = [];
        const agi = [];
        const int = [];
        const uni = [];

        data.constants.heroes.forEach((hero) => {
            const attr = hero.stats?.primaryAttribute;
            if (attr === "str") str.push(hero);
            else if (attr === "agi") agi.push(hero);
            else if (attr === "int") int.push(hero);
            else uni.push(hero);
        });

        const sortByName = (a, b) => a.displayName.localeCompare(b.displayName);

        setStrengthHeroes(str.sort(sortByName));
        setAgilityHeroes(agi.sort(sortByName));
        setIntelligenceHeroes(int.sort(sortByName));
        setUniversalHeroes(uni.sort(sortByName));
    }, [data]);
    if (loading && !data) {
        return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading users...</p>
        </div>
        );
    }

    

    if (error) {
        return (
        <div className="error-container">
            <h3>Error loading users</h3>
            <p>{error.message}</p>
            <button onClick={() => refetch()}>Try Again</button>
        </div>
        );
    }

   

    return (
        <>
            {data.constants.heroes ? (
                <div className="HeroListPage">
                    <section className="heroAttribute">
                        <div className="attributeTitle">
                        <img style={{height:"68px", width:'68px'}} alt="Strength Icon" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png/revision/latest/scale-to-width-down/20?cb=20180323111829" />
                        <h2 className="titles">STRENGTH</h2>
                        </div>
                        <div className="heroAttribute" >
                            {strengthHeroes.map((hero) => {
                            return (<HeroImage key={hero.id} heroId={hero.id} displayName={hero.displayName} name={hero.name}></HeroImage>)
                            
                        })}
                        </div>
                        
                    </section>
                    <section className="heroAttribute">
                        <div className="attributeTitle">
                        <img style={{height:"68px", width:'68px'}} alt="Aglility Icon" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png/revision/latest/scale-to-width-down/20?cb=20180323111717" />
                        <h2 className="titles">AGILITY</h2>
                        </div>
                        <div className="heroAttribute" >
                            {agilityHeroes.map((hero) => {
                            return (<HeroImage key={hero.id} heroId={hero.id} displayName={hero.displayName} name={hero.name}></HeroImage>)
                            
                        })}
                        </div>
                        
                    </section>
                    <section className="heroAttribute">
                        <div className="attributeTitle">
                        <img style={{height:"68px", width:'68px'}} alt="Intelligence Icon" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/5/56/Intelligence_attribute_symbol.png/revision/latest/scale-to-width-down/20?cb=20180323111753" />
                        <h2 className="titles">INTELLIGENCE</h2>
                        </div>
                        <div className="heroAttribute" >
                            {intelligenceHeroes.map((hero) => {
                            return (<HeroImage key={hero.id} heroId={hero.id} displayName={hero.displayName} name={hero.name}></HeroImage>)
                            
                        })}
                        </div>
                        
                    </section>
                    <section>
                        <div className="attributeTitle">
                        <img style={{height:"68px", width:'68px'}} alt="Universal Icon" src="https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Universal_attribute_symbol.png/revision/latest/scale-to-width-down/20?cb=20230501030320" />
                        <h2 className="titles">UNIVERSAL</h2>
                        </div>
                        <div className="heroAttribute" >
                            {universalHeroes.map((hero) => {
                            return (<HeroImage key={hero.id} heroId={hero.id} displayName={hero.displayName} name={hero.name}></HeroImage>)
                            
                        })}
                        </div>
                        
                    </section>
                </div>
            ) : <div></div>
            }
        </>
        
    )
}

export default HeroListPage