import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { pouchdbService } from '../../pouchdbService';
import { pencil, trash, print, eye } from 'ionicons/icons';
import GuiaRemisionPrintPreview from './GuiaRemisionPrintPreview';
import './ConsultarGuiasRemision.css';

const ConsultarGuiasRemision: React.FC = () => {

  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<any[]>([]);

  // const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { name } = useParams<{ name: string; }>();

  useEffect(() => {
    // Load documents from CouchDB
    pouchdbService.findAllDocumentsByType('GuiasRemision')
      .then(data => {
        setItems(data)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    // console.count()
    // debugger
  }, []);

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
        return pouchdbService.findAllDocumentsByType('GuiasRemision');
      })
      .then((data) => {
        setItems(data);
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
        return pouchdbService.findAllDocumentsByType('GuiasRemision');
      })
      .then((data) => {
        setItems(data);
        setEditItem([]);
      });
  };

  const handleDeleteItem = (id: string, rev: string) => {
    // Delete a document in PouchDB
    debugger
    pouchdbService.deleteDocument(id, rev)
      .then(() => {
        // After deleting, fetch the updated list
        return pouchdbService.findAllDocumentsByType('GuiasRemision');
      })
      .then((data) => {
        setItems(data);
      });
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null); // Hide the print preview by setting selectedItem to null
};

  return (
    <IonPage>
      <IonHeader className="hide-content-print">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Google Cloud Firestore CRUD v4</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="hide-content-print">
        <IonItem>
          <IonInput
            placeholder="New Item"
            value={newItem}
            onIonInput={(e) => setNewItem(e.detail.value!)}
          />
          <IonButton onClick={handleAddItem}>Add Item</IonButton>
        </IonItem>

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
            {items.map((item) => (
              <IonCol key={item._id} size="12" size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
                <IonCard color="primary">
                  <IonCardHeader>
                    <IonCardSubtitle>{item.Descripcion}</IonCardSubtitle>
                    <IonCardTitle>{item.Nombre}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {item.DNI}
                  </IonCardContent>
                  <div style={{ marginTop: 'auto' }}>
                    <IonButton onClick={() => handleDeleteItem(item._id, item._rev)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                    <IonButton onClick={() => setSelectedItem(item)}>
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
          <GuiaRemisionPrintPreview guiaRemisionData={selectedItem} onBackButtonClick={handleBackButtonClick}/>
        )}
      </div>
    </IonPage>
  );
};

export default ConsultarGuiasRemision;