import React from "react";
import { Modal } from "react-bootstrap";
import FormAdd from "../Form/FormAdd";
import FormEdit from "../Form/FormEdit";

const ModalAddNote = ({show, handleClose, triggerData, setTriggerData, dataNote, setDataNote, setAlert, handleAlert}) => {
  return (
    <Modal show={show} onHide={() => handleClose()} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {dataNote.title ? "Edit Note" : "Add Note"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataNote.title ? (
          <FormEdit
            triggerData={triggerData}
            setTriggerData={setTriggerData}
            handleCloseModal={handleClose}
            dataNote={dataNote}
            setDataNote={setDataNote}
            handleAlert={handleAlert}
          />
        ) : (
          <FormAdd
            triggerData={triggerData}
            setTriggerData={setTriggerData}
            handleCloseModal={handleClose}
            handleAlert={handleAlert}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddNote;
