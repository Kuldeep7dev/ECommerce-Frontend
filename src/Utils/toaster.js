import toast from "react-hot-toast";

export const showSuccess = (msg) => {
    toast.dismiss()
    toast.success(msg);
}

export const showError = (msg) => {
    toast.dismiss()
    toast.error(msg);
}

export const showLoading = (msg) => {
    toast.dismiss()
    toast.loading(msg)
};