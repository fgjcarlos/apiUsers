import toast from "react-hot-toast";

export const throwSuccessToast = (message, duration) => {
  toast.success(message, {
    duration: duration,
  });
};

export const throwErrorToast = (message, duration) => {
  toast.error(message, {
    duration: duration,
  });
};

export const throwLoadingToast = (message, duration) => {
  toast.loading(message, {
    duration: duration,
  });
};
