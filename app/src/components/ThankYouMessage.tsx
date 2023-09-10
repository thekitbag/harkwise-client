import { IonCard, IonCardContent } from '@ionic/react'
import React from 'react'

interface SuccessProps {
}

const Blurb: React.FC<SuccessProps> = ( ) => {
    return (
        <IonCard>
            <IonCardContent>
                <h1 color='dark'>Thank you for your review, you've helped make us a better place</h1>
            </IonCardContent>
        </IonCard>
    
        )
}

export default Blurb