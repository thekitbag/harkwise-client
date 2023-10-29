import { IonHeader, IonImg, IonToolbar } from "@ionic/react"
import { Link } from "react-router-dom";
import logoSymbol from '../assets/Original Logo Symbol.png';

interface HeaderProps {
    url: string;
}

const Header: React.FC<HeaderProps> = ({url}) => {
    return (
        <IonHeader>
            <Link className='link' to={url}>
            <IonToolbar className="header-toolbar">
                <div className="logo-title-container">
                <IonImg src={logoSymbol} alt="Harkwise Logo" className="logo" />
                <h1>Harkwise</h1>
                </div>
            </IonToolbar>
            </Link>
        </IonHeader>
    )
}

export default Header