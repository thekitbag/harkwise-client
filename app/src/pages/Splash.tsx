import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonText, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput } from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import mainLogo from '../assets/Original Logo.png'
import './Home.css';


const Splash: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
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
            <IonInput
              value={email}
              placeholder="Your Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
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
