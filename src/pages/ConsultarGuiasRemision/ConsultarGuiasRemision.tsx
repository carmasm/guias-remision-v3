import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { pouchdbService } from '../../pouchdbService';
import { pencil, trash, print, eye } from 'ionicons/icons';
import GuiaRemisionPrintPreview from './GuiaRemisionPrintPreview';
import './ConsultarGuiasRemision.css';
import { useLocation } from 'react-router';

const ConsultarGuiasRemision: React.FC = () => {

  const [documents, setDocuments] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<any[]>([]);
  const location = useLocation<any>();

  // const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { name } = useParams<{ name: string; }>();

  useEffect(() => {
    // Load documents from CouchDB
    pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc')
      .then(data => {
        setDocuments(data)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      debugger
      console.log(navigator.userAgent);
    // console.count()
    // debugger
  }, [location.key]);

  const handleAddItem = () => {

    debugger
    // Create a new document based on the interface
    const newItemData = {
      FechaTransaccion: new Date(),
      DNI: 'XXXX-XXXX-XXXXX',
      Descripcion: 'Description test',
      Nombre: newItem,
      Collection: 'GuiasRemision'
    };

    // Add a new document to PouchDB
    pouchdbService.addDocument(newItemData)
      .then(() => {
        // After adding, fetch the updated list
        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');
      })
      .then((data) => {
        setDocuments(data);
        setNewItem('');
      });
  };

  const handleUpdateItem = () => {
    if (!editItem) return;
    debugger

    // Update a document in PouchDB
    pouchdbService.updateDocument(editItem)
      .then(() => {
        // After updating, fetch the updated list
        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');
      })
      .then((data) => {
        setDocuments(data);
        setEditItem([]);
      });
  };

  const handleDeleteItem = (id: string, rev: string) => {
    // Delete a document in PouchDB
    debugger
    pouchdbService.deleteDocument(id, rev)
      .then(() => {
        // After deleting, fetch the updated list
        return pouchdbService.findAllDocumentsByCollectionSorted('GuiasRemision', 'FechaTransaccion', 'desc');
      })
      .then((data) => {
        setDocuments(data);
      });
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null); // Hide the print preview by setting selectedItem to null
  };

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
    <IonPage>
      <IonHeader className="hide-content-print">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Apache CouchDB v3.3</IonTitle>
        </IonToolbar>
        {/* <IonToolbar>
          <IonSearchbar />
        </IonToolbar> */}
      </IonHeader>

      <IonContent className="hide-content-print">
        {/* <IonItem>
          <IonInput
            placeholder="New Item"
            value={newItem}
            onIonInput={(e) => setNewItem(e.detail.value!)}
          />
          <IonButton onClick={handleAddItem}>Add Item</IonButton>
        </IonItem> */}

        {/* <IonList>
          {items.map((item) => (
            <IonItem key={item._id}>
              <IonInput
                value={item.DNI}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated DNI
                  setEditItem({ ...item, DNI: e.detail.value! });
                }}
              />
              <IonInput
                value={item.Descripcion}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated Descripcion
                  setEditItem({ ...item, Descripcion: e.detail.value! });
                }}
              />
              <IonInput
                value={item.Nombre}
                onIonChange={(e) => {
                  // Create a copy of the item with the updated Nombre
                  setEditItem({ ...item, Nombre: e.detail.value! });
                }}
              />
              <IonButton onClick={handleUpdateItem}>
                <IonIcon icon={pencil} />
              </IonButton>
              <IonButton onClick={() => handleDeleteItem(item._id, item._rev)}>
                <IonIcon icon={trash} />
              </IonButton>
              <IonButton onClick={() => window.print()}>
                <IonIcon icon={print} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <IonCard color="secondary">
                <IonCardHeader>
                  <IonCardSubtitle />
                  <IonCardTitle />
                </IonCardHeader>
                <IonCardContent>

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <IonGrid>
          <IonRow>
            {documents.map((doc) => (
              <IonCol key={doc._id} size="12" size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
                <IonCard color="primary">
                  <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', zIndex: '10' }}>
                    {doc.NumeracionCorrelativa}
                  </div>
                  <IonCardHeader>
                    <IonCardSubtitle>{formatDate(doc.FechaTransaccion)}</IonCardSubtitle>
                    <IonCardTitle>{doc.NombreDestinatario}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {doc.NombrePuntoDeDestino}
                  </IonCardContent>
                  <div style={{ marginTop: 'auto' }}>
                    <IonButton onClick={() => handleDeleteItem(doc._id, doc._rev)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    <IonButton onClick={() => setSelectedItem(doc)}>
                      <IonIcon icon={eye} />
                    </IonButton>
                  </div>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      <div className={`print-preview ${selectedItem ? 'visible' : ''}`}>
        {selectedItem && (
          <GuiaRemisionPrintPreview guiaRemisionData={selectedItem} onBackButtonClick={handleBackButtonClick} />
        )}
      </div>
    </IonPage>
  );
};

export default ConsultarGuiasRemision;