import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './Modal';
import { addDoc, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function Docs({ database }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [docsData, setDocsData] = useState([]);
    const isMounted = useRef(false);
    let navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const collectionRef = collection(database, 'docsData');

    // Function to add data to Firebase Firestore
    const addData = () => {
        addDoc(collectionRef, { title: title })
            .then(() => {
                alert('Data Added');
                handleClose();
            })
            .catch(() => {
                alert('Cannot add data');
            });
    };

    // Fetch data from Firebase Firestore
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(
                data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
    };

    // Function to delete a document from Firebase Firestore
    const deleteDocument = (id) => {
        const documentRef = doc(database, 'docsData', id); // Reference to the document
        deleteDoc(documentRef)
            .then(() => {
                alert('Document Deleted');
            })
            .catch((error) => {
                alert('Cannot delete document: ' + error.message);
            });
    };

    // Fetch data when the component mounts
    useEffect(() => {
        if (isMounted.current) return;

        isMounted.current = true;
        getData();
    }, []);

    // Get ID and navigate to the EditDocs page
    const getID = (id) => {
        navigate(`/editDocs/${id}`);
    };

    return (
        <div className='docs-main bg-yellow-400'>
            <div className='text-3xl'>Document Collaboration Software</div>
            <button className='add-docs' onClick={handleOpen}>
                Add a Document
            </button>

            <ModalComponent
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData}
            />

            {/* Display data from Firestore */}
            <div className='bg-yellow-300'>
                {docsData.map((doc) => (
                    <div className='grid-child' key={doc.id}>
                        <p onClick={() => getID(doc.id)}>{doc.title}</p>
                        <button
                            className='delete-docs'
                            onClick={() => deleteDocument(doc.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
