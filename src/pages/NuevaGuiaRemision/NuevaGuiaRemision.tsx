import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { pouchdbService } from '../../pouchdbService';


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

  // const [defaultValue, setDefaultValue] = useState('1623d582b77ef85496e3259a7b05532e'); //FRUTA FRESCA DE PALMA AFRICANA

  useEffect(() => {
    console.log('NuevaGuiaRemision')
    pouchdbService.findAllDocumentsByType('Remitentes')
      .then(data => {
        setRemitentes(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('Destinatarios')
      .then(data => {
        setDestinatarios(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('CentrosdeRecoleccion')
      .then(data => {

        setPuntosdePartida(data)
        setPuntosdeDestino(data)

        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('Configuraciones')
      .then(data => {
        setmotivosDeTraspaso(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('Productos')
      .then(data => {
        setProductos(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('Transportistas')
      .then(data => {
        setTransportistas(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    pouchdbService.findAllDocumentsByType('Conductores')
      .then(data => {
        setConductores(data)
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // debugger
    // console.log(remitentes);
  }, []);


  const handleSaveItem = () => {

    const newDocument = {
            IdCodigo:              '',
            NombreCortoCodigo:     '',
            IdRemitente:           selectedRemitente._id,
            NombreRemitente:       selectedRemitente.Nombre,
            IdDestinatario:        selectedDestinatario._id,
            NombreDestinatario:    selectedDestinatario.Nombre,
            IdPuntoDePartida:      selectedPuntoDePartida._id,
            NombrePuntoDePartida:  selectedPuntoDePartida.Nombre,
            IdPuntoDeDestino:      selectedPuntoDeDestino._id,
            NombrePuntoDeDestino:  selectedPuntoDeDestino.Nombre,
            IdMotivo:              selectedMotivo._id,
            DescripcionMotivo:     selectedMotivo.Valor,
            IdProducto:            selectedProducto._id,
            DescripcionProducto:   selectedProducto.Descripcion,
            IdTransportista:       selectedTransportista._id,
            NombreTransportista:   selectedTransportista.Nombre,
            IdConductor:           selectedConductor._id,
            NombreConductor:       selectedConductor.NombreCompleto,
            IdDocumentoFiscal:     '',
            IdUsuario:             '',
            NombreUsuario:         '',
            FechaTransaccion:      new Date(),
            FechaLimiteEmision:    '',
            CAI:                   '',
            NumeracionCorrelativa: 0,
            RandoAutorizado:       '',
            Cantidad:              Number(cantidad),
            Collection:            'GuiasRemision'
    }

    pouchdbService.addDocument(newDocument)
      .then(() => {
        setSelectedRemitente(null);
        setSelectedDestinatario(null);
        setSelectedPuntoDePartida(null);
        setSelectedPuntoDeDestino(null);
        setSelectedMotivo(null);
        setSelectedConductor(null);
        setSelectedTransportista(null);
        setSelectedProducto(null);
        setCantidad(null);

        setToast(true);
      });
  };

  return (
    <IonPage>
      <IonToast isOpen={toast} onDidDismiss={() => setToast(false)} message="Documento guardado!" duration={1500} />
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
          <IonSelect label="Remitente" labelPlacement="floating" fill="outline" value={selectedRemitente} onIonChange={e => setSelectedRemitente(e.detail.value)}>
            {remitentes.map((rmt) => (
              <IonSelectOption key={rmt._id} value={rmt}>
                {rmt.Nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonSelect label="Destinatario" labelPlacement="floating" fill="outline" value={selectedDestinatario} onIonChange={e => setSelectedDestinatario(e.detail.value)}>
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
          <IonInput label="Cantidad" labelPlacement="stacked" fill="solid" value={cantidad} onIonInput={(e) => setCantidad(e.detail.value!)}></IonInput>
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
        <IonButton expand="block" onClick={handleSaveItem}>Salvar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NuevaGuiaRemision;