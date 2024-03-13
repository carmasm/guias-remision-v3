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

    function extractDay(dateString: string): string {
        const date = new Date(dateString);
        return String(date.getDate()).padStart(2, '0');
    }

    function extractMonth(dateString: string): string {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(dateString);
        return months[date.getMonth()];
    }

    function extractYear(dateString: string): string {
        const date = new Date(dateString);
        return String(date.getFullYear());
    }

    return (
        <div className="container">
            <div className="invoice-box">
                <div className="table">
                    <div className="top trh">
                        <div className="title td">
                            <h1>AGOINCA S. DE R.L.</h1>
                            <h3>AGRO INVERSIONES DEL CARIBE S. DE R.L.</h3>
                            <h6>Col. Trejo, 11 Calle, 27 Y 29 Ave., Frente al Parque Chahin, San Pedro Sula, Cortés</h6>
                            <h6>Teléfono: 2510-3280 RTN: 05019019181991 Correo: agroinca@gmail.com</h6>
                            <h6>CAI: B3F076-2BA5FF-1A4DAB-A4DFA3-B4B655-32</h6>
                        </div>

                        <div className="td">
                            <h6>GUÍA DE REMISIÓN</h6>
                            <h6>000-001-08-00</h6><br />
                            <h4>No 000000</h4>
                        </div>
                    </div>

                    <div className="dt">San Pedro Sula, Cortés {extractDay(guiaRemisionData.FechaTransaccion)} de {extractMonth(guiaRemisionData.FechaTransaccion)} del {extractYear(guiaRemisionData.FechaTransaccion)}</div>

                    <div className="information trh">
                        <div className="td">
                            Remitente: {guiaRemisionData.NombreRemitente} 
                        </div>

                        <div className="td">
                            RTN/N. Ident.:
                        </div>

                        <div className="td">
                            Destinatario: {guiaRemisionData.NombreDestinatario}
                        </div>

                        <div className="td">
                            RTN/N. Ident.:
                        </div>

                        <div className="td">
                            Punto de Partida: {guiaRemisionData.NombrePuntoDePartida}
                        </div>

                        <div className="td">
                        </div>

                        <div className="td">
                            Punto de Destino: {guiaRemisionData.NombrePuntoDeDestino}
                        </div>

                        <div className="td">
                        </div>
                        <div className="td">
                            Motivo de Traslado: {guiaRemisionData.DescripcionMotivo}
                        </div>

                        <div className="td">
                        </div>

                        <div className="td">
                            Fecha de Inicio del Traslado:_______________
                        </div>

                        <div className="td">
                            Fecha de Terminación del Traslado:__________
                        </div>
                    </div>

                    <div className="heading tr">
                        <div className="td">DESCRIPCIÓN</div>

                        <div className="td">CANTIDAD</div>
                    </div>

                    <div className="details tr">
                        <div className="td">{guiaRemisionData.DescripcionProducto}</div>

                        <div className="td">{guiaRemisionData.Cantidad}</div>
                    </div>

                    <div>Datos del Transportista</div>

                    <div className="item tr">
                        <div className="td">Denominación / Nombres y Apellidos: {guiaRemisionData.NombreTransportista}</div>

                        <div className="td">RTN/N. Ident.:</div>
                    </div>

                    <div>Datos de la Unidad de Transporte y Conductor</div>

                    <div className="item tr">
                        <div className="td">Nombres y Apellidos: {guiaRemisionData.NombreConductor}</div>

                        <div className="td">RTN/N. Ident.:</div>
                    </div>

                    <div className="item last tr">
                        <div className="td">Marca y No. de Placa:</div>

                        <div className="td">Licencia de Conducir:</div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="footer">
                        <div className="td left">Rango Autorizado: 000-001-08-00003101 - 000-001-08-00003500</div>
                        <div className="td">________________________</div>
                        <div className="td left">Fecha de Recepción: 06/01/2024 - Fecha Límite de Emisión: 01/06/2025</div>
                        <div className="td">Firma</div>
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
        </div>
    );
};

export default GuiaRemisionPrintPreview;