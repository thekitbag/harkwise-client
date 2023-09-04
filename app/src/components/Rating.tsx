import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { Dispatch, SetStateAction } from 'react';

interface RatingProps {
    setRated: Dispatch<SetStateAction<{ rated: boolean; rating: number; }>>;
}


const Rating: React.FC<RatingProps> = ({setRated}) => {
    return ( 
    <IonCard>
        <IonCardContent>
            <IonButton color="danger" onClick = { ()=> setRated({rated: true, rating: 1}) }>Awful</IonButton>
            <IonButton color="danger" onClick = { ()=> setRated({rated: true, rating: 2}) }>Bad</IonButton>
            <IonButton color="medium" onClick = { ()=> setRated({rated: true, rating: 3}) }>OK</IonButton>
            <IonButton color="success" onClick = { ()=> setRated({rated: true, rating: 4}) }>Good</IonButton>
            <IonButton color="success" onClick = { ()=> setRated({rated: true, rating: 5}) }>Amazing</IonButton>
        </IonCardContent>
    </IonCard>
    );
};

export default Rating