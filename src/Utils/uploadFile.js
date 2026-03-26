import axiosInstance from "../Config/AxiosInstance";

const ASSETS_API = "/upload-file";

/*
Allowed folders to prevent misuse
Must match backend allowed folders
*/
const ALLOWED_FOLDERS = ["products", "users", "banners"];

/*
Slug generator
*/
export const textToSlug = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

/*
UPLOAD FILE
*/
export const uploadFile = async (file, folder = "products", userPrefix = "file") => {
    try {

        if (!file) {
            return { success: false, error: "File missing" };
        }

        if (!ALLOWED_FOLDERS.includes(folder)) {
            return { success: false, error: "Invalid folder" };
        }

        const prefix = textToSlug(userPrefix);

        const formData = new FormData();
        formData.append("file", file);

        const endpoint =
            `${ASSETS_API}?folder=${encodeURIComponent(folder)}&prefix=${encodeURIComponent(prefix)}`;

        const response = await axiosInstance.post(endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        if (response?.data?.success && response?.data?.fileName) {
            return {
                success: true,
                fileName: response.data.fileName,
            };
        }

        return {
            success: false,
            error: response?.data?.message || "Upload failed",
        };

    } catch (error) {

        console.error("Upload error:", error);

        return {
            success: false,
            error: error?.response?.data?.message || "Upload error",
        };
    }
};


/*
DELETE FILE
*/
export const deleteFile = async (fileName, folder = "products") => {
    try {

        if (!fileName) {
            return { success: false, error: "File name missing" };
        }

        if (!ALLOWED_FOLDERS.includes(folder)) {
            return { success: false, error: "Invalid folder" };
        }

        const endpoint = `${ASSETS_API}/${folder}/${fileName}`;

        const response = await axiosInstance.delete(endpoint);

        if (response?.data?.success) {
            return {
                success: true,
                fileName,
            };
        }

        return {
            success: false,
            error: response?.data?.message || "Delete failed",
        };

    } catch (error) {

        console.error("Delete error:", error);

        return {
            success: false,
            error: error?.response?.data?.message || "Delete error",
        };
    }
};

export default uploadFile;