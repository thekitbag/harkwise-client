import { IonButton, IonCard, IonCardContent, IonImg, IonInput, IonLabel, IonItem, IonText } from '@ionic/react';
import React, { useState } from 'react';
import ReviewSite from '../utils/types';
import harkwiseLogo from '../assets/Original Logo.png';

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

    let content;
    if (rating < 4) {
        content = (
            <IonCard>
                <IonCardContent>
                    <IonText>We're sorry that your experience at {establishment} wasn't what you hoped. If you want to use Harkwise to understand your customers better, please get in touch</IonText>
                    <br />
                    <IonButton expand="block" fill="outline" href="mailto:paul@harkwise.com?subject=I%20want%20to%20start%20using%20Harkwise" target="_blank" rel="noopener noreferrer">
                        Contact
                    </IonButton>
                </IonCardContent>
            </IonCard>
        );
    } else {
        content = (
            <IonCard>
                <IonCardContent>
                    <IonText>We're so happy you had a great time at {establishment}.</IonText>
                    <br />
                    {publicReviewSites.length > 0 && (
                        <>
                            <IonText>Why not tell others why you liked it so much</IonText>
                            <div>
                                {publicReviewSites.map((site, index) => (
                                    <IonButton key={index} fill="outline" expand="block" href={site.link} target="_blank" rel="noopener noreferrer">
                                        {//iconForSite(site.name) && <IonIcon slot="start" name={iconForSite(site.name)}></IonIcon>}
                                        }
                                        Review on {site.name.charAt(0).toUpperCase() + site.name.slice(1)}
                                    </IonButton>
                                ))}
                            </div>
                        </>
                    )}
                </IonCardContent>
            </IonCard>
        );
    }

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
    
        const email = (e.target as HTMLFormElement)["email"].value;
    
        try {
            const response = await fetch('/api/captured-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, establishmentId }),
            });
    
            if (response.ok) {
                setSubmitSuccess(true);  // Indicate success
            } else {
                setSubmitSuccess(false);  // Indicate failure
                console.error('Failed to submit email');
            }
        } catch (error) {
            setSubmitSuccess(false);
            console.error('Error occurred:', error);
        } finally {
            setSubmitting(false);  // Reset submission indicator
        }
    };
    
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            background: '#f3f4f9'
        }}>
            <IonImg src={harkwiseLogo} alt="Harkwise Logo" style={{ width: '120px', marginBottom: '20px' }} />

            <IonCard style={{ width: '100%', marginTop: '10px' }}>
                <IonCardContent>
                    <IonText color="dark" style={{ fontSize: '16px', marginBottom: '12px' }}>
                        {rating < 4 ?
                            `We're sorry that your experience at ${establishment} wasn't what you hoped for.`
                            :
                            `We're so happy you had a great time at ${establishment}.`
                        }
                    </IonText>

                    {publicReviewSites.length > 0 && (
                        <>
                            <IonText color="dark" style={{ fontSize: '16px', marginBottom: '12px' }}> Why not tell others why you liked it so much?</IonText>
                            {publicReviewSites.map((site, index) => (
                                <IonButton key={index} fill="outline" expand="full" href={site.link} target="_blank" rel="noopener noreferrer">
                                    Review on {site.name.charAt(0).toUpperCase() + site.name.slice(1)}
                                </IonButton>
                            ))}
                        </>
                    )}
                </IonCardContent>
            </IonCard>

            {captureEmail && (
                <IonCard style={{ width: '100%', marginTop: '10px' }}>
                    <IonCardContent>
                        <IonText color="medium" style={{ fontSize: '14px', marginBottom: '12px' }}>
                            Enter your email if you are happy for {establishment} to contact you in the future
                        </IonText>
                        
                        <form onSubmit={handleEmailSubmit}>
                            <IonItem lines="full">
                                <IonLabel position="floating">Your Email</IonLabel>
                                <IonInput name="email" type="email" placeholder="Enter your email" required></IonInput>
                            </IonItem>
                            <IonButton expand="full" type="submit" style={{ margin: '20px 0' }}>Submit</IonButton>
                        </form>

                        {
                            submitting && <IonText>Submitting...</IonText>
                        }

                        {
                            submitSuccess && <IonText color="success">Email saved. Thank you!</IonText>
                        }

                        {
                            submitSuccess === false && <IonText color="danger">Failed to submit email. Please try again.</IonText>
                        }
                    </IonCardContent>
                </IonCard>
            
            )}

            <IonCard style={{ width: '100%', marginTop: '10px' }}>
                <IonCardContent>
                    <IonText>If you want Harkwise to help boost your small business, then please get in touch</IonText>
                    <IonButton expand="full" fill="outline" href="mailto:paul@harkwise.com?subject=I%20want%20to%20start%20using%20Harkwise" target="_blank" rel="noopener noreferrer">
                        Contact
                    </IonButton>
                </IonCardContent>
            </IonCard>

        </div>
    );
}

export default TYMessage;