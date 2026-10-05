
import { gql } from "@apollo/client"


export const ALL_HERO_INFO = gql`
    query {
        constants {
            heroes {
                id
                name
                displayName
                aliases
                stats {
                    primaryAttribute
                }
            }
        }
    }
` 


export const HERO_MATCHUP_INFO = gql`
    query GetHeroMatchups($heroId: Short!) {
        heroStats {
            heroVsHeroMatchup(heroId: $heroId) {
                advantage {
                    heroId
                    matchCountVs
                    matchCountWith
                    vs {
                        heroId1
                        heroId2
                        matchCount
                        synergy
                        winsAverage
                    }
                    with {
                        heroId1
                        heroId2
                        matchCount
                        synergy
                        winsAverage
                    }
                }
            }
        }
    }
`;

export const HERO_HYPE_INFO = gql`
query GetDotaHeroes($heroId: Short!){
    constants{
        hero(id: $heroId){
        displayName
        language {
        displayName,
        hype,
        lore
}}}
}`