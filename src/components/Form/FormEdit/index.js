import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EditNote } from "../../../utils/api";

const FormEdit = ({triggerData,setTriggerData,handleCloseModal,dataNote,setDataNote,handleAlert}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    body: "",
  });
  useEffect(() => {
    setFormData(dataNote);
  }, [dataNote]);

  const submitForm = async (e) => {
    e.preventDefault();
    await EditNote(formData);
    setFormData({ title: "", body: "", id: ""});
    setTriggerData(!triggerData);
    setDataNote({});
    handleCloseModal();
    handleAlert("success", "Success Edit Note!")
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="text"
          as="textarea" 
          rows={10}
          placeholder="Enter Body"
          value={formData.body}
          onChange={(event) =>
            setFormData({ ...formData, body: event.target.value })
          }
        />
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        <Button variant="primary" type="submit">Edit Note</Button>
      </Modal.Footer>
    </Form>
  );
};

export default FormEdit;
