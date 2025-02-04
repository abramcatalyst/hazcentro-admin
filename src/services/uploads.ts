import axios from "axios";
import toast from "react-hot-toast";
import { formatErrorMessage } from "src/utils";
import { FileUploadResType, FileUploadType } from "src/utils/types";

export const uploadImage = async ({
  file,
  token,
}: {
  file: FileUploadType;
  token: string;
}): Promise<FileUploadResType | null> => {
  try {
    const formData = new FormData();
    formData.append("image", file as Blob);
    const { data } = await axios.post(`/uploads/images`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } catch (error) {
    const errMsg = formatErrorMessage(error);
    toast.error(errMsg);
    return null;
  }
};
