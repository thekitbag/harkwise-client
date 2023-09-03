import { IonHeader } from '@ionic/react'
import React from 'react'

interface BlurbProps {
    establishment: string
}

const Blurb: React.FC<BlurbProps> = ( {establishment} ) => {
    return <h1>How was your experience at {establishment}?</h1>
}

export default Blurb