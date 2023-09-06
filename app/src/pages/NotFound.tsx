import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/react';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>404: Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '40%' }}>
          <IonText style={{ fontSize: '1.5em', marginBottom: '20px' }}>
            Oops! The establishment you're looking for does not exist.
          </IonText>
          <IonButton routerLink="/" color="primary" expand="block">
            Go to Home
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
