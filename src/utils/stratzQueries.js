
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

// const { loading, error, data, refetch } = useQuery(ALL_HERO_INFO, {
//         variables: { limit: 10, offset: 0 },
//         notifyOnNetworkStatusChange: true,
//     });

export const HERO_MATCHUP_INFO = gql`
    query {
        heroStats {
            heroVsHeroMatchup (heroId: 2){
            advantage{
                heroId,
                matchCountVs,
                matchCountWith,
                vs {
                    heroId1,
                    heroId2,
                    week,
                    kills,
                    matchCount,
                    synergy,
                    winRateHeroId1,
                    winRateHeroId2,
                    winsAverage
                }
                with {
                    heroId1,
                    heroId2,
                    week,
                    kills,
                    matchCount,
                    synergy,
                    winRateHeroId1,
                    winRateHeroId2,
                    winsAverage
                }
            }
            }
        }
    }
`