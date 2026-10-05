import * as React from "react";
import Header from "./assets/Header";

function AboutPage() {

    return (
        <div className="aboutPage">
            <Header />
            <section className="landingContent aboutContent">
                <p className="landingEyebrow">About</p>
                <h1>Trust not the Abominable Intelligence</h1>
                <p className="landingDescription">
                    The website is 90% made by human hand with AI assisting in the 10% for UI purposes.
                </p>
                <p className="landingDescription">
                    I made this website in order to relearn web dev basics after I lost them to AI. But after doing it, I realised how easy it is to fall back to it. If you are a web developer, please try to avoid it as much as possible.
                </p>
            </section>
            <footer style={{color:'#aebcbe'}}>Made by <a href="https://sundaresan-karunakaran.github.io/">Sundaresan Karunakaran</a></footer>
        </div>
    )
}


export default AboutPage