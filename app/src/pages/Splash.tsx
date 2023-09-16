import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonText, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput } from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import mainLogo from '../assets/Original Logo.png'
import './Home.css';


const Splash: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<{ name?: string, email?: string }>({});

  const validate = () => {
    let tempErrors: { name?: string, email?: string } = {};

    if (!name.trim()) {
        tempErrors.name = "Name is required";
    }

    if (!email.trim()) {
        tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {  // simple regex for email
        tempErrors.email = "Email is not valid";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;  // returns true if no errors
}


  const handleSubmit = async () => {
    if (!validate()) return;  // Don't proceed if there are validation errors

    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        // Handle success (e.g., show a success message)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Harkwise
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <div className="logo-container">
          <img src={mainLogo} alt="Harkwise Logo"></img>
        </div>

        <IonText>
          <h2>Unlock the Power of Real-Time Customer Feedback</h2>
          <p>Bridge the gap between the digital and physical realms. Use instant insights from your customers to refine, innovate, and elevate their experience. Join top businesses in making every visit even better.</p>
        </IonText>

        <IonList>
          <IonItem>
            <IonIcon icon={checkmarkOutline} slot="start"></IonIcon>
            <IonLabel>Immediate Customer Insights</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={checkmarkOutline}  slot="start"></IonIcon>
            <IonLabel>Real-time Feedback Collection</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={checkmarkOutline}  slot="start"></IonIcon>
            <IonLabel>Empower Business Decisions</IonLabel>
          </IonItem>
        </IonList>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Get Started with Harkwise</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Enter your details and we'll be in touch shortly.
            <IonInput
              value={name}
              placeholder="Your Name"
              onIonChange={(e) => setName(e.detail.value!)}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            <IonInput
              value={email}
              placeholder="Your Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <IonButton expand="block" onClick={handleSubmit}>
              Submit
            </IonButton>
          </IonCardContent>
        </IonCard>

      </IonContent>

    </IonPage>
  );
};

export default Splash;
