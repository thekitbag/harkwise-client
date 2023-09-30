import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonModal, IonIcon } from '@ionic/react';
import './ExampleReport.css';
import wordClouds from '../assets/word_clouds.png';
import daily_reviews_ratings from '../assets/daily_reviews_ratings.png';
import { useState } from 'react';
import { closeCircleOutline } from 'ionicons/icons';

const Report: React.FC = () => {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Harkwise Cafe Review September 13th to 28th</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
  
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Headline Stats</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Total Reviews: 32</p>
              <p>Average Rating: 3.31 out of 5</p>
            </IonCardContent>
          </IonCard>
  
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Ratings Overview</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={daily_reviews_ratings} />
            </IonCardContent>
          </IonCard>
  
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Comments Visualisation</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={wordClouds} onClick={() => setShowModal(true)}/> {/* Open modal on image click */}
            </IonCardContent>
        </IonCard>

        {/* Modal to display image in fullscreen */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonImg src={wordClouds} style={{ width: '100%', height: 'auto', maxHeight: '100vh' }} />
            <IonButton fill="clear" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setShowModal(false)}>
                <IonIcon icon={closeCircleOutline} size="large" />
            </IonButton>
        </IonModal>
  
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Review Highlights</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <strong>Top 3 Negative Reviews:</strong>
              <ul>
                <li>Date: 2023-09-15 - Rating: 1 - "Waited too long for my order."</li>
                <li>Date: 2023-09-17 - Rating: 1 - "Bad experience. Found a hair in my drink."</li>
                <li>Date: 2023-09-19 - Rating: 1 - "Order got mixed up. Not a great day."</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>AI Generated Advice</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                "Consider improving order accuracy, enhance Wi-Fi, and address noise levels. Train staff for consistent friendly service. Expand menu variety."
            </IonCardContent>
          </IonCard>
  
          <IonButton expand="full" routerLink="/">Back to Home</IonButton>
  
        </IonContent>
      </IonPage>
    );
};

export default Report;
