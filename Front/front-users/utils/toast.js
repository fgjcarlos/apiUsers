import ToasterLogout from "components/ToasterLogOut";
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

export const toasterLogOut = () => {


  toast.custom((t) => (
    <ToasterLogout t={t} />
  ),{
    duration: 50000,
    position: "top-center",
    
  });
};
