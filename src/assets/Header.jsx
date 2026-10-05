import "./Header.css"
import { Link } from "react-router-dom"


function DotaIcon({ size = 50, color = "#547873" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{paddingTop:'15px'}}>
      {/* Background Box */}
      <rect width="100" height="100" rx="16" fill="#121418" />
      {/* Radiant Base */}
      <rect x="15" y="57" width="28" height="28" rx="4" fill={color} />
      {/* Dire Base */}
      <rect x="57" y="15" width="28" height="28" rx="4" fill={color} />
      {/* Diagonal River Bar */}
      <polygon points="12,12 88,88 76,88 12,24" fill={color} />
    </svg>
  );
}

function Header() {
    return (
        <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
            <Link to={"/"}>
                <header className='temp'>
                    <DotaIcon />
                    <div style={{padding: "10px"}}>
                        FIRSTPICK <div className="smallHeaderText">Draft better in Dota</div>
                    </div>
                </header>
            </Link>
            <div  style={{display:'flex', paddingRight: '30px', fontSize:"30px", fontFamily: 'cinzel', color: 'white', fontWeight: '100px'}}>
                <div className="headerButton">
                <Link to={"/heroes"}>
                    HEROS
                </Link>
                </div>
                <div className="headerButton">
                <Link to={"/about"}>
                    ABOUT
                </Link>
                </div>
            </div>
        </div>
    )

}

export default Header