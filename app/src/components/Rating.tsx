import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { Dispatch, SetStateAction } from 'react';
import angry from '../assets/1F621.svg';
import sad from '../assets/1F61E.svg';
import neutral from '../assets/1F610.svg';
import like from '../assets/1F600.svg';
import love from '../assets/1F60D.svg';


interface RatingProps {
    setRated: Dispatch<SetStateAction<{ rated: boolean; rating: number; }>>;
}


const Rating: React.FC<RatingProps> = ({setRated}) => {
    return ( 
    <IonCard>
        <IonCardContent>
            <div className='emoji-container'>
                <div onClick = { ()=> setRated({rated: true, rating: 1}) }>
                    <img src={angry} alt="Angry Emoji" width="75" className='emoji' />
                </div>
                <div onClick = { ()=> setRated({rated: true, rating: 2}) }>
                    <img src={sad} alt="Sad Emoji" width="75" className='emoji'/>
                </div>
                <div onClick = { ()=> setRated({rated: true, rating: 3}) }>
                    <img src={neutral} alt="Neutral Emoji" width="75" className='emoji'/>
                </div>
                <div onClick = { ()=> setRated({rated: true, rating: 4}) }>
                    <img src={like} alt="Like Emoji" width="75" className='emoji'/>
                </div>
                <div onClick = { ()=> setRated({rated: true, rating: 5}) }>
                    <img src={love} alt="Love Emoji" width="75" className='emoji'/>
                </div>
            </div>
        </IonCardContent>
    </IonCard>
    );
};

export default Rating