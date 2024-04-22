import React from "react";
import "../index.css";
import { URL } from "../App";

const ContactList = ({ contacts, updateContact, updateCb }) => {
	const onDelete = async (id) => {
		try {
			const options = {
				method: ["DELETE"],
			};
			const res = await fetch(`${URL}/delete_contact/${id}`, options);

			if (res.status === 200) {
				updateCb();
			} else {
				console.error("Failed to delete");
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<h2>Contacts</h2>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contact) => {
						return (
							<tr key={contact.id}>
								<td>{contact.firstName}</td>
								<td>{contact.lastName}</td>
								<td>{contact.email}</td>
								<td>
									<button onClick={() => updateContact(contact)}>Update</button>
									<button onClick={() => onDelete(contact.id)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ContactList;
