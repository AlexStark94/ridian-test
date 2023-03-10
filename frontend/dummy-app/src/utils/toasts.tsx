import toast from 'react-hot-toast';

export function toastSuccess(data) {
  return toast.success(`Trade Placed: You made a trade for $${data.price}`, {
    position: 'bottom-center',
    style: {
      border: 'solid 2px #00BD6E',
      fontWeight: '600',
      padding: '8 24 8 16',
      fontFamily: 'Inter, sans-serif',
      marginRight: '3rem',
    },
  });
}

export function toastError() {
  return toast.error('An error occurred. Try again later', {
    position: 'bottom-center',
    style: {
      border: 'solid 2px #CB392E',
      fontWeight: '600',
      padding: '8 24 8 16',
      fontFamily: 'Inter, sans-serif',
      marginRight: '3rem',
    },
  });
}