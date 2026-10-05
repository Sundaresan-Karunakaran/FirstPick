import { Link } from 'react-router-dom'
import './App.css'
import Header from './assets/Header.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="landingPage">
        <section className="landingContent">
          <p className="landingEyebrow">DOTA 2 DRAFTING COMPANION</p>
          <h1>Make your next pick count.</h1>
          <p className="landingDescription">
            Explore hero matchups, discover strong synergies, and build a better
            draft before the game begins.
          </p>
          <Link className="landingButton" to="/heroes">
            Browse heroes <span>→</span>
          </Link>
        </section>
      </main>
    </>
  )
}

export default App
