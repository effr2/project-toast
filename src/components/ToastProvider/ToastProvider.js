import React from "react";
export const ToastsContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toastDismiss = (id) => {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  };
  function createToast(variant, message) {
    const id = crypto.randomUUID();
    setToasts([...toasts, { variant, message, id }]);
  }

  const values = {
    toasts,
    toastDismiss,
    createToast,
  };
  return (
    <ToastsContext.Provider value={values}>{children}</ToastsContext.Provider>
  );
}

export default ToastProvider;
