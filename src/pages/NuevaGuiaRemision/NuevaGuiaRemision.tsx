import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { pouchdbService } from '../../pouchdbService';
import { useHistory, useLocation } from 'react-router';
import './NuevaGuiaRemision.css';

const NuevaGuiaRemision: React.FC = () => {

  const [remitentes, setRemitentes] = useState<any[]>([]);
  const [destinatarios, setDestinatarios] = useState<any[]>([]);
  const [puntosdePartida, setPuntosdePartida] = useState<any[]>([]);
  const [puntosdeDestino, setPuntosdeDestino] = useState<any[]>([]);
  const [motivosDeTraspaso, setmotivosDeTraspaso] = useState<any[]>([]);
  const [conducdores, setConductores] = useState<any[]>([]);
  const [transportistas, setTransportistas] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);

  const [selectedRemitente, setSelectedRemitente] = useState<any>(null);
  const [selectedDestinatario, setSelectedDestinatario] = useState<any>(null);
  const [selectedPuntoDePartida, setSelectedPuntoDePartida] = useState<any>(null);
  const [selectedPuntoDeDestino, setSelectedPuntoDeDestino] = useState<any>(null);
  const [selectedMotivo, setSelectedMotivo] = useState<any>(null);
  const [selectedConductor, setSelectedConductor] = useState<any>(null);
  const [selectedTransportista, setSelectedTransportista] = useState<any>(null);
  const [selectedProducto, setSelectedProducto] = useState<any>('1623d582b77ef85496e3259a7b05532e'); //FRUTA FRESCA DE PALMA AFRICANA
  const [cantidad, setCantidad] = useState<any>(null);

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");
  const location = useLocation();
  const history = useHistory();

  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [present, dismiss] = useIonLoading();

  // const [defaultValue, setDefaultValue] = useState('1623d582b77ef85496e3259a7b05532e'); //FRUTA FRESCA DE PALMA AFRICANA

  useEffect(() => {
    console.log('NuevaGuiaRemision')
    pouchdbService.findAllDocumentsByCollectionSorted('Remitentes', 'Nombre', 'asc')
      .then(data => {
        setRemitentes(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('Destinatarios', 'Nombre', 'asc')
      .then(data => {
        setDestinatarios(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('CentrosdeRecoleccion', 'Nombre', 'asc')
      .then(data => {

        setPuntosdePartida(data)
        setPuntosdeDestino(data)

        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('Configuraciones', 'Valor', 'asc')
      .then(data => {
        setmotivosDeTraspaso(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('Productos', 'Descripcion', 'asc')
      .then(data => {
        setProductos(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('Transportistas', 'Nombre', 'asc')
      .then(data => {
        setTransportistas(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByCollectionSorted('Conductores', 'NombreCompleto', 'asc')
      .then(data => {
        setConductores(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [location.key]);


  const handleSaveItem = async () => {

    try {

      validateFields();

      // Check if any required field is empty
      if (invalidFields.length > 0) {

        setToastMessage("Please fill out all required fields.");
        setToastColor("warning");
        setToast(true);

        return;
      }

      // present('Salvando...');
      debugger

      const gmt6Date = new Date().toLocaleString('en-US', { timeZone: 'America/Guatemala' });
      const fechaTransaccion = new Date(gmt6Date).toISOString(); //REALMENTE ES NECESARIO CONVERTIR LA FECHA A FORMATO ISO????

      const [
        doctoFiscalData
      ] = await Promise.all([
        pouchdbService.findAllDocumentsBy([['Collection', 'DocumentosFiscales'], ['Activo', true]])
      ]);

      const doctoFiscal: any = doctoFiscalData[0];

      if (doctoFiscal) {

        const numeracionCorrelativa = Number(doctoFiscal.NumeracionCorrelativaActual) + 1;

        const newDocument = {
              IdCodigo: '',
              NombreCortoCodigo: '',
              IdRemitente: selectedRemitente?._id,
              NombreRemitente: selectedRemitente.Nombre,
              IdDestinatario: selectedDestinatario._id,
              NombreDestinatario: selectedDestinatario.Nombre,
              IdPuntoDePartida: selectedPuntoDePartida._id,
              NombrePuntoDePartida: selectedPuntoDePartida.Nombre,
              IdPuntoDeDestino: selectedPuntoDeDestino._id,
              NombrePuntoDeDestino: selectedPuntoDeDestino.Nombre,
              IdMotivo: selectedMotivo._id,
              DescripcionMotivo: selectedMotivo.Valor,
              IdProducto: selectedProducto._id,
              DescripcionProducto: selectedProducto.Descripcion,
              IdTransportista: selectedTransportista._id,
              NombreTransportista: selectedTransportista.Nombre,
              IdConductor: selectedConductor._id,
              NombreConductor: selectedConductor.NombreCompleto,
              IdDocumentoFiscal: doctoFiscal._id,
              IdUsuario: '',
              NombreUsuario: '',
              FechaTransaccion: fechaTransaccion,
              FechaLimiteEmision: doctoFiscal.FechaLimiteEmision,
              CAI: doctoFiscal.CAI,
              NumeracionCorrelativa: numeracionCorrelativa,
              RangoAutorizadoInicial: `${doctoFiscal.PuntoDeEmisionInicial}-${doctoFiscal.EstablecimientoInicial}-${doctoFiscal.TipoDeDocumentoInicial}-${doctoFiscal.NumeracionCorrelativaInicial}`,
              RangoAutorizadoFinal: `${doctoFiscal.PuntoDeEmisionFinal}-${doctoFiscal.EstablecimientoFinal}-${doctoFiscal.TipoDeDocumentoFinal}-${doctoFiscal.NumeracionCorrelativaFinal}`,
              Estado: 'EMITIDA',
              Cantidad: Number(cantidad),
              DeviceInfo: navigator.userAgent,
              Collection: 'GuiasRemision'
        }

        await pouchdbService.addDocument(newDocument);
        await pouchdbService.updateDocument({ ...doctoFiscal, NumeracionCorrelativaActual: numeracionCorrelativa });

        setSelectedRemitente(null);
        setSelectedDestinatario(null);
        setSelectedPuntoDePartida(null);
        setSelectedPuntoDeDestino(null);
        setSelectedMotivo(null);
        setSelectedConductor(null);
        setSelectedTransportista(null);
        setSelectedProducto(null);
        setCantidad(null);

        // dismiss();

        setToastMessage("¡Documento guardado!"); // Set the success toast message
        setToast(true);

        history.push("/page/consultar-guias-remision");

      }

    } catch (error) {

      console.error(error);

    }

  };

  const validateFields = () => {
    const invalidFieldsArray: string[] = [];

    if (!selectedRemitente) invalidFieldsArray.push("selectedRemitente");
    if (!selectedDestinatario) invalidFieldsArray.push("selectedDestinatario");
    if (!selectedPuntoDePartida) invalidFieldsArray.push("selectedPuntoDePartida");
    if (!selectedPuntoDeDestino) invalidFieldsArray.push("selectedPuntoDeDestino");
    if (!selectedMotivo) invalidFieldsArray.push("selectedMotivo");
    if (!selectedProducto) invalidFieldsArray.push("selectedProducto");
    if (!selectedTransportista) invalidFieldsArray.push("selectedTransportista");
    if (!selectedConductor) invalidFieldsArray.push("selectedConductor");
    if (!cantidad) invalidFieldsArray.push("cantidad");

    setInvalidFields(invalidFieldsArray);
  };

  return (
    <IonPage>
      <IonToast className="custom-toast" isOpen={toast} onDidDismiss={() => setToast(false)} message={toastMessage} duration={2000} color={toastColor} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nueva Guía de Remisión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <br />
        <IonItem>
          <IonSelect label="Remitente" labelPlacement="floating" fill="outline"
            interface="action-sheet"
            // style={{ "--border-color": invalidFields.includes("selectedRemitente") ? "red" : "" }}
            // color="danger"
            value={selectedRemitente} onIonChange={e => setSelectedRemitente(e.detail.value)}>
            {remitentes.map((rmt) => (
              <IonSelectOption key={rmt._id} value={rmt}>
                {rmt.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonSelect label="Destinatario" labelPlacement="floating" fill="outline" interface="popover"
            value={selectedDestinatario} onIonChange={e => setSelectedDestinatario(e.detail.value)}>
            {destinatarios.map((dst) => (
              <IonSelectOption key={dst._id} value={dst}>
                {dst.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <br />
        <IonItem>
          <IonSelect label="Punto de Partida" labelPlacement="floating" fill="outline" value={selectedPuntoDePartida} onIonChange={e => setSelectedPuntoDePartida(e.detail.value)}>
            {puntosdePartida.map((ctr) => (
              <IonSelectOption key={ctr._id} value={ctr}>
                {ctr.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonSelect label="Punto de Destino" labelPlacement="floating" fill="outline" value={selectedPuntoDeDestino} onIonChange={e => setSelectedPuntoDeDestino(e.detail.value)}>
            {puntosdeDestino.map((ctr) => (
              <IonSelectOption key={ctr._id} value={ctr}>
                {ctr.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <br />
        <IonItem>
          <IonSelect label="Motivos de Traslado" labelPlacement="floating" fill="outline" value={selectedMotivo} onIonChange={e => setSelectedMotivo(e.detail.value)}>
            {motivosDeTraspaso.map((mtv) => (
              <IonSelectOption key={mtv._id} value={mtv}>
                {mtv.Valor}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <br />
        <IonItem>
          <IonSelect label="Producto" labelPlacement="floating" fill="outline" value={selectedProducto} onIonChange={e => setSelectedProducto(e.detail.value)}>
            {productos.map((prd) => (
              <IonSelectOption key={prd._id} value={prd}>
                {prd.Descripcion}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonInput label="Cantidad" labelPlacement="stacked" fill="solid" type="number" value={cantidad} onIonInput={(e) => setCantidad(e.detail.value!)}></IonInput>
        </IonItem>
        <br />
        <IonItem>
          <IonSelect label="Transportista" labelPlacement="floating" fill="outline" value={selectedTransportista} onIonChange={e => setSelectedTransportista(e.detail.value)}>
            {transportistas.map((trp) => (
              <IonSelectOption key={trp._id} value={trp}>
                {trp.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonSelect label="Conductor" labelPlacement="floating" fill="outline" value={selectedConductor} onIonChange={e => setSelectedConductor(e.detail.value)}>
            {conducdores.map((cnt) => (
              <IonSelectOption key={cnt._id} value={cnt}>
                {cnt.NombreCompleto}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton id="present-alert" expand="block">Salvar</IonButton>
        <IonAlert
          // header="Alert!"
          message="¿Está seguro que desea salvar los datos?"
          trigger="present-alert"
          buttons={[
            {
              text: 'No',
              role: 'cancel',
            },
            {
              text: 'Si',
              role: 'confirm',
              handler: handleSaveItem,
            },
          ]}
        // onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default NuevaGuiaRemision;