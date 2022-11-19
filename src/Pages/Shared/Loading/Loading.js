import React from 'react';

const Loading = () => {
  return (
    <div
      class="spinner-grow inline-block w-12 h-12 text-primary  bg-current rounded-full opacity-0"
      role="status"
    >
      <span class="visually-hidden">...</span>
    </div>
  );
};

export default Loading;
