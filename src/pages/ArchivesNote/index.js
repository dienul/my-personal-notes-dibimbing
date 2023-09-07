import React, { useEffect, useState } from "react";
import CardGroup from "../../components/Card";
import { DeleteNoteById, EditNote, getArchives, getFilterArchive } from "../../utils/api";
import ModalAddNote from "../../components/ModalAddNote"
import { Form } from "react-bootstrap";


const Archives = () => {
    const [dataNotes, setDataNotes] = useState([]);
    const [dataNote, setDataNote] = useState({});
    const [triggerData, setTriggerData] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleGetAllNotes = async () => {
        await getArchives().then((response) => setDataNotes(response.data));
    };

    const handleEditNote = (data) => {
        setDataNote(data)
        handleShow()
    }

    const handleDeleteNote = async (id) =>{
        await DeleteNoteById(id);
        setTriggerData(!triggerData);
    }

    const handleArchivedNote = async (data) => {
        await EditNote({...data, archived: !data.archived})
        setTriggerData(!triggerData);
    }

    const handleFilterArchive = async (event) => {
        const title = event.target.value;
        await getFilterArchive(title).then((response) => setDataNotes(response.data));
    }

    useEffect(() => {
        handleGetAllNotes();
    }, [triggerData]);
    
    return (
        <div className="content">
            <ModalAddNote
                show={show}
                handleClose={handleClose}
                triggerData={triggerData}
                setTriggerData={setTriggerData}
                dataNote={dataNote}
                setDataNote={setDataNote}
            />

            <div className="d-flex justify-content-between mb-3">
                <h2 style={{color: "grey", textAlign: "center"}}>Notes List</h2>
                <Form.Group>
                    <Form.Control placeholder="Search Title" onChange={handleFilterArchive}/>
                </Form.Group>
            </div>
            <div className="notes-list">
                {dataNotes.map((data, index) => {
                   return <CardGroup data={data} key={index} handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} handleArchivedNote={handleArchivedNote}/>
                })}
            </div>
        </div>
    );
};

export default Archives;
