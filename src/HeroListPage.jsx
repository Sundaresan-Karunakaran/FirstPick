import * as React from "react";
import HeroList from "./assets/HeroList";
import Header from "./assets/Header";
import PageAnimation from "./assets/PageAnimation";
function HeroListPage() {

    return (
        <PageAnimation>
        <Header></Header>
        <HeroList></HeroList>
        </PageAnimation>
    )
}


export default HeroListPage