
const API_BASE_URL = "https://crudcrud.com/api/0e2b8e88667f4188924c1404e1f3faa5";
const appointmentsEndpoint = `${API_BASE_URL}/appointments`;

let appointments = []; // Initialize the appointments array

// Function to get appointments from the API
async function getAppointmentsFromAPI() {
  try {
    const response = await axios.get(appointmentsEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

// Function to save an appointment to the API
async function saveAppointmentToAPI(appointment) {
  try {
    const response = await axios.post(appointmentsEndpoint, appointment);
    return response.data;
  } catch (error) {
    console.error("Error saving appointment:", error);
    return null;
  }
}

// Function to delete an appointment from the API
async function deleteAppointmentFromAPI(id) {
  try {
    const response = await axios.delete(`${appointmentsEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return null;
  }
}

// Function to update an appointment on the API
async function updateAppointmentOnAPI(id, appointment) {
  try {
    const response = await axios.put(`${appointmentsEndpoint}/${id}`, appointment);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    return null;
  }
}

// Function to submit the appointment
async function submitAppointment() {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name !== '' && phone !== '' && email !== '') {
    const appointmentDetails = { name, phone, email };

    try {
      const savedAppointment = await saveAppointmentToAPI(appointmentDetails);
      if (savedAppointment) {
        updateAppointmentList();
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  }
}

// Function to update the appointment list on the HTML page
async function updateAppointmentList() {
  const appointmentListElement = document.getElementById('appointmentList');
  appointmentListElement.innerHTML = '';

  try {
    appointments = await getAppointmentsFromAPI(); // Assign the fetched appointments to the global variable

    appointments.forEach((appointment, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `Name: ${appointment.name}, Phone: ${appointment.phone}, Email: ${appointment.email} 
      <button onclick="editAppointment(${index})">Edit</button>
      <button onclick="removeAppointment('${appointment._id}')">Delete</button>`;
      appointmentListElement.appendChild(listItem);
      appointmentListElement.appendChild(document.createElement('br'));
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
}

// Function to remove an appointment
async function removeAppointment(id) {
  try {
    await deleteAppointmentFromAPI(id);
    updateAppointmentList();
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
}

// Function to edit an appointment
// Function to edit an appointment
async function editAppointment(index) {
  const appointment = appointments[index];
  const newName = prompt('Enter new name:', appointment.name);
  const newPhone = prompt('Enter new phone number:', appointment.phone);
  const newEmail = prompt('Enter new email ID:', appointment.email);

  if (newName && newPhone && newEmail) {
    const updatedAppointment = { ...appointment, name: newName, phone: newPhone, email: newEmail };

    try {
      await updateAppointmentOnAPI(appointment._id, updatedAppointment);
      updateAppointmentList(); // Update the list after editing the appointment
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }
}
