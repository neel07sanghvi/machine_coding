import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

export const URL = "http://127.0.0.1:5000";

function App() {
	const [contacts, setcontacts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentContact, setcurrentContact] = useState({});

	const fetchContacts = async () => {
		const res = await fetch(`${URL}/contacts`);
		const data = await res.json();
		setcontacts(data.contacts ?? []);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setcurrentContact({});
	};

	const openCreateModal = () => {
		if (!isModalOpen) {
			setIsModalOpen(true);
		}
	};

	const openEditModal = (contact) => {
		if (isModalOpen) {
			return;
		}

		setcurrentContact(contact);
		setIsModalOpen(true);
	};

	const onUpdate = () => {
		closeModal();
		fetchContacts();
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<>
			<ContactList
				contacts={contacts}
				updateContact={openEditModal}
				updateCb={onUpdate}
			/>
			<button onClick={openCreateModal}>Create New Contact</button>
			{isModalOpen && (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={closeModal}>
							&times;
						</span>
						<ContactForm existingContact={currentContact} updateCb={onUpdate} />
					</div>
				</div>
			)}
		</>
	);
}

export default App;
