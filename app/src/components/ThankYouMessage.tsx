import { IonButton, IonCard, IonCardContent, IonImg, IonInput, IonLabel, IonItem, IonText, IonCardHeader } from '@ionic/react';
import React, { useState } from 'react';
import ReviewSite from '../utils/types';

interface TYMessageProps {
    establishment: string;
    establishmentId: number;
    rating: number;
    publicReviewSites: ReviewSite[];
    captureEmail: boolean;
}

const TYMessage: React.FC<TYMessageProps> = ({ establishment, rating, publicReviewSites, captureEmail, establishmentId }) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const iconForSite = (site: string): string | undefined => {
        switch (site) {
            case 'google':
                return "logo-google";
            case 'facebook':
                return "logo-facebook";
            default:
                return undefined;
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage(null); // reset previous error messages
        
        const email = (e.target as HTMLFormElement)["email"].value;
        
        try {
            const response = await fetch('/api/captured-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, establishmentId }),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setSubmitSuccess(true);
            } else {
                setSubmitSuccess(false);
                if (response.status === 409 && responseData.error === "email_exists") {
                    setSubmitSuccess(true);
                } else if (response.status >= 500) {
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage('Failed to submit email. Please try again.');
                }
            }
        } catch (error) {
            setSubmitSuccess(false);
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <IonItem color="primary">
                <h2>
                    {rating < 4 ?
                        `We're sorry that your experience wasn't what you hoped for and we appreciate your feedback.`
                        :
                        `We're glad you liked it! Thanks for letting us know.`
                    }
                </h2>
            </IonItem>
                {publicReviewSites.length > 0 && (
                    <IonItem>
                        <h2 color="dark"> Why not tell others why you liked it so much?</h2>
                        {publicReviewSites.map((site, index) => (
                            <IonButton color="seconday" key={index} fill="outline" expand="full" href={site.link} target="_blank" rel="noopener noreferrer">
                                Review on {site.name.charAt(0).toUpperCase() + site.name.slice(1)}
                            </IonButton>
                        ))}
                    </IonItem>
                )}
            

            {captureEmail && (
                <IonCard color="tertiary">
                    <IonCardHeader>
                        <h3 className='contact-card-header'>Enter your email if you are happy for {establishment} to contact you in the future</h3>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={handleEmailSubmit}>
                            <IonItem lines="full">
                                <IonLabel position="floating">Your Email</IonLabel>
                                <IonInput name="email" type="email" placeholder="Enter your email" required></IonInput>
                            </IonItem>
                            <IonButton expand="full" type="submit">Submit</IonButton>
                        </form>

                        {
                            submitting && <IonText>Submitting...</IonText>
                        }

                        {
                            submitSuccess && <IonText color="success">Email saved. Thank you!</IonText>
                        }

                        {
                            errorMessage && <IonText color="danger">{errorMessage}</IonText>
                        }
                    </IonCardContent>    
                </IonCard>         
            )}

        </div>
    );
}

export default TYMessage;