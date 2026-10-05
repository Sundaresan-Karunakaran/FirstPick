import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getHeroImageUrl } from "./HeroImage";

function HeroTable({heroes = [], heroLookup = {}, mode}) {
    const [sortConfig, setSortConfig] = useState({
        key: "synergy",
        direction: "desc"
    })

    const sortedHeroes = useMemo(() => {
        return [...heroes].sort((a, b) => {
            const valA = a[sortConfig.key] ?? 0;
            const valB = b[sortConfig.key] ?? 0;

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [heroes, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortIndicator = (key) => {
        if (sortConfig.key !== key) return "↕";
        return sortConfig.direction === "asc" ? "↑" : "↓";
    };

    return (
        <table className="heroTable">
            <thead>
                <tr>
                    <th
                        onClick={() => handleSort("heroId")}
                        aria-sort={sortConfig.key === "heroId" ? sortConfig.direction : "none"}
                    >
                        Hero <span className="sortIndicator">{sortIndicator("heroId")}</span>
                    </th>
                    <th
                        onClick={() => handleSort("matchCount")}
                        aria-sort={sortConfig.key === "matchCount" ? sortConfig.direction : "none"}
                    >
                        Matches <span className="sortIndicator">{sortIndicator("matchCount")}</span>
                    </th>
                    <th
                        onClick={() => handleSort("winsAverage")}
                        aria-sort={sortConfig.key === "winsAverage" ? sortConfig.direction : "none"}
                    >
                        Win rate <span className="sortIndicator">{sortIndicator("winsAverage")}</span>
                    </th>
                    <th
                        onClick={() => handleSort("synergy")}
                        aria-sort={sortConfig.key === "synergy" ? sortConfig.direction : "none"}
                    >
                        {mode === "with" ? "Synergy" : "Advantage"} <span className="sortIndicator">{sortIndicator("synergy")}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedHeroes.map((hero, index) => (
                    <tr
                        key={hero.heroId}
                        className={index < 3
                            ? sortConfig.direction === "asc"
                                ? "top-three top-three-red"
                                : "top-three top-three-green"
                            : ""}
                    >
                        <td>
                            {heroLookup[hero.heroId] ? (
                                <Link
                                    className="heroTableHero"
                                    to={`/hero/${hero.heroId}/${heroLookup[hero.heroId].imageName}`}
                                >
                                    <img
                                        src={getHeroImageUrl(heroLookup[hero.heroId].name)}
                                        alt={heroLookup[hero.heroId].displayName}
                                    />
                                    <span>{heroLookup[hero.heroId].displayName}</span>
                                </Link>
                            ) : (
                                `Hero ${hero.heroId}`
                            )}
                        </td>
                        <td>{hero.matchCount?.toLocaleString() ?? "-"}</td>
                        <td>{`${(hero.winsAverage * 100).toFixed(1)}%`}</td>
                        <td>{hero.synergy == null ? "-" : `${(hero.synergy * 10).toFixed(1)}%`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default HeroTable