import { IonButton } from '@ionic/react'
import React from 'react'

interface SubmitButtonProps {
    handleSubmit: (event: React.FormEvent) => Promise<void>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({handleSubmit}) => {
    return <IonButton onClick={handleSubmit} color="secondary" expand="block">Submit</IonButton>
}

export default SubmitButton