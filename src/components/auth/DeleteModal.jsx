import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function DeleteConfirmationModal(props) {
  const [error, setError] = useState("");
  const { deleteCurrentUser } = useAuth();
  const navigate = useNavigate();

  async function handleDelete() {
    setError("");

    try {
      await deleteCurrentUser();
      navigate("/home");
    } catch (err) {
      setError(
        "Failed to delete this account. You may need to log back in to try again."
      );
      console.log(err);
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="delete-confirmation-modal"
        centered
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="delete-confirmation-modal">
            ⚠️ Permenantly Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a non-revesable action, clicking delete below will permenantly
          and irretrievably delete your account and all associated information.
          <p className="mt-2 mb-0 text-center fw-bold fs-6">
            This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="text-center d-flex justify-content-evenly ">
          <Button onClick={handleDelete} className="btn-danger">
            Delete Profile
          </Button>
          <Button className="w-20 btn-secondary" onClick={props.onHide}>
            Close
          </Button>

          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
