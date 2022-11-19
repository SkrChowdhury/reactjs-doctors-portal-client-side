import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
  //treatment is appointmentOptions with name, slots, _id
  const { name: treatmentName, slots } = treatment;
  const date = format(selectedDate, 'PP');
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: treatmentName,
      patient: name,
      slot,
      email,
      phone,
    };
    //TODO: send data to the server and once data is saved then close the modal and display toast
    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.acknowledged) {
          setTreatment(null);
          toast.success('Booking Confirmed');
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              disabled
              type="text"
              value={date}
              className="input input-bordered input-secondary w-full"
            />
            <select name="slot" className="select select-secondary w-full">
              {slots.map((slot, i) => (
                <option key={i} value={slot} className="text-black">
                  {slot}
                </option>
              ))}
            </select>
            <input
              required
              disabled
              name="name"
              type="text"
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input input-bordered input-secondary w-full"
            />
            <input
              required
              disabled
              name="email"
              type="email"
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input input-bordered input-secondary w-full"
            />
            <input
              required
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered input-secondary w-full"
            />

            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
