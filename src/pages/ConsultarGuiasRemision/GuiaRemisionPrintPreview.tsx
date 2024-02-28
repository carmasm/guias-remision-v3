import { IonButton, IonContent, IonIcon } from '@ionic/react';
import './GuiaRemisionPrintPreview.css';
import { arrowBackOutline, downloadOutline, printOutline } from 'ionicons/icons';

const GuiaRemisionPrintPreview: React.FC<{ guiaRemisionData: any, onBackButtonClick: () => void }> = ({ guiaRemisionData, onBackButtonClick }) => {

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        // Get day, month, year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
    }

    return (
        <IonContent>
        <div className="invoice-box">
            <table cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr className="top">
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                <tr>
                                    <td className="title">
                                        <img
                                            src="https://sparksuite.github.io/simple-html-invoice-template/images/logo.png"
                                            style={{ width: '100%', maxWidth: '300px' }} />
                                    </td>

                                    <td>
                                        Invoice #: 123<br />
                                        Created: January 1, 2023<br />
                                        Due: February 1, 2023
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr className="information">
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Sparksuite, Inc.<br />
                                        12345 Sunny Road<br />
                                        Sunnyville, CA 12345
                                    </td>

                                    <td>
                                        Acme Corp.<br />
                                        John Doe<br />
                                        john@example.com
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr className="heading">
                        <td>Payment Method</td>

                        <td>Check #</td>
                    </tr>

                    <tr className="details">
                        <td>Check</td>

                        <td>1000</td>
                    </tr>

                    <tr className="heading">
                        <td>Item</td>

                        <td>Price</td>
                    </tr>

                    <tr className="item">
                        <td>Website design</td>

                        <td>$300.00</td>
                    </tr>

                    <tr className="item">
                        <td>Hosting (3 months)</td>

                        <td>$75.00</td>
                    </tr>

                    <tr className="item last">
                        <td>Domain name (1 year)</td>

                        <td>$10.00</td>
                    </tr>

                    <tr className="total">
                        <td></td>

                        <td>Total: $385.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
            <div className="buttons-container">
                <IonButton onClick={onBackButtonClick}>
                    <IonIcon icon={arrowBackOutline} />
                    Back
                </IonButton>
                <IonButton onClick={() => window.print()}>
                    <IonIcon icon={printOutline} />
                    Print
                </IonButton>
                <IonButton>
                    <IonIcon icon={downloadOutline} />
                    Download
                </IonButton>
            </div>
        </IonContent>
    );
};

export default GuiaRemisionPrintPreview;