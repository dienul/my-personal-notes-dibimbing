import React, { useEffect, useState, useContext } from "react";
import CardGroup from "../../components/Card";
import { GetAllNotes, DeleteNoteById, EditNote, FilterNote } from "../../utils/api";
import ModalAddNote from "../../components/ModalAddNote"
import { DataContext } from "../../App";
import { Button, Form } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';


const Home = () => {
    const [dataNotes, setDataNotes] = useState([]);
    const [dataNote, setDataNote] = useState({});
    const [triggerData, setTriggerData] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({des: "", variant:"success"});
    const [showAlert, setShowAlert] = useState(false);
    const dataLogin = useContext(DataContext);

    const handleAlertShow = () => setShowAlert(true);
    const handleAlertClose = () => setShowAlert(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleGetAllNotes = async () => {
        await GetAllNotes().then((response) => setDataNotes(response.data));
    };

    const handleEditNote = (data) => {
        setDataNote(data)
        handleShow()
    }

    const handleDeleteNote = async (id) =>{
        await DeleteNoteById(id);
        handleAlert("success", "Success Delete Note!")
        setTriggerData(!triggerData);
    }

    const handleArchivedNote = async (data) => {
        await EditNote({...data, archived: !data.archived})
        handleAlert("success", `Success ${!data.archived ? "Archived!" :"Unarchive"}!`) // unarchives
        setTriggerData(!triggerData);
    }

    const handleFilterNote = async (event) => {
        const title = event.target.value;
        await FilterNote(title).then((response) => setDataNotes(response.data));
    }

    const handleAlert = async(variant, des) => {
        setAlert({variant, des})
        handleAlertShow()
    }

    useEffect(() => {
        handleGetAllNotes();
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      
        return () => clearTimeout(timer); 
    }, [triggerData]);
    return (
        <div className="content">
            <Alert key="success" variant={alert.variant} show={showAlert} onClose={() => handleAlertClose()} dismissible>
                {alert.des}
            </Alert>
            <ModalAddNote
                show={show}
                handleClose={handleClose}
                triggerData={triggerData}
                setTriggerData={setTriggerData}
                dataNote={dataNote}
                setDataNote={setDataNote}
                handleAlert={handleAlert}
            />

            <div className="d-flex justify-content-between mb-3">
                <h2 style={{color: "grey", textAlign: "center"}}>Notes List</h2>
                <Form.Group>
                    <Form.Control placeholder="Search Title" onChange={handleFilterNote}/>
                </Form.Group>
                {dataLogin.isLogin && (
                    <Button variant="primary" onClick={handleShow}>Add Note</Button>
                )}
            </div>
            <div className="notes-list">
                {dataNotes.map((data, index) => {
                   return <CardGroup data={data} key={index} handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} handleArchivedNote={handleArchivedNote}/>
                })}
            </div>
        </div>
    );
};

export default Home;
