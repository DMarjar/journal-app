import axios from "axios";

const uploadImage = async (file) => {
    
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "curso-vue");
    formData.append("file", file);

    const url = "https://api.cloudinary.com/v1_1/dq1so9dp8/image/upload";

    const { data } = await axios.post(url, formData);
    const { secure_url } = data;

    return secure_url;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;