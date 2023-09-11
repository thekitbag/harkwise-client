import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonText } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';

const Splash: React.FC = () => {
  const email = "mfgray87@gmail.com";
  const subject = encodeURIComponent("I want to start using Harkwise!");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Harkwise</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '40%' }}>
          <IonText style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            Understand what your customers really think about your business
          </IonText>
          <IonButton href={`mailto:${email}?subject=${subject}`} expand="block" fill="outline">
            Contact Us
            <IonIcon slot="end" icon={mailOutline} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
