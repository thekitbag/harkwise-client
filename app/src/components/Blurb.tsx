import React from 'react'

interface BlurbProps {
    establishment: string
}

const Blurb: React.FC<BlurbProps> = ( {establishment} ) => {
    return <h2>How was your experience at {establishment}?</h2>
}

export default Blurb