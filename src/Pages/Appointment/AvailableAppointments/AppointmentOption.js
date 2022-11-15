import React from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const AppointmentOption = ({ appointmentOption }) => {
  const { name, slots } = appointmentOption;
  return (
    <div className="card bg-base-100 shadow-xl ">
      <div className="card-body ">
        <h2 className="card-title text-secondary self-center font-semibold">
          {name}
        </h2>
        <p className="text-center">
          {slots.length > 0 ? slots[0] : 'Try Another Day'}
        </p>
        <p className="text-center">
          {slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available
        </p>
        <div className="card-actions justify-center ">
          <PrimaryButton>Book Appointment</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
