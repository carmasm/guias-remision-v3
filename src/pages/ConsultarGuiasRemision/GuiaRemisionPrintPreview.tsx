import { IonButton, IonIcon } from '@ionic/react';
import './GuiaRemisionPrintPreview.css';
import { arrowBackOutline, downloadOutline, printOutline } from 'ionicons/icons';

const GuiaRemisionPrintPreview: React.FC<{ guiaRemisionData: any, onBackButtonClick: () => void }> = ({ guiaRemisionData, onBackButtonClick}) => {

    return (
        <div className="invoice-print-preview">
            <div className="header">
                <h1>Guía de Remisión</h1>
                <p>Numeración Correlativa: {guiaRemisionData.NumeracionCorrelativa}</p>
                <p>Fecha: {guiaRemisionData.FechaTransaccion}</p>
            </div>
            <div className="content">
                <div className="customer-details">
                    <h2>Customer Details</h2>
                    <p>Remitente: {guiaRemisionData.NombreRemitente}</p>
                    <p>Destinatario: {guiaRemisionData.NombreDestinatario}</p>
                    <p>Punto de Partida: {guiaRemisionData.NombrePuntoDePartida}</p>
                    <p>Punto de Destino: {guiaRemisionData.NombrePuntoDeDestino}</p>
                    <p>Motivo: {guiaRemisionData.DescripcionMotivo}</p>
                    {/* Add more customer details as needed */}
                </div>
                <div className="invoice-details">
                    <h2>Invoice Details</h2>
                    <p>Producto: {guiaRemisionData.DescripcionProducto}</p>
                    <p>Cantidad (T): {guiaRemisionData.Cantidad}</p>
                    {/* Add more invoice details as needed */}
                </div>
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
        </div>
    );
};

export default GuiaRemisionPrintPreview;