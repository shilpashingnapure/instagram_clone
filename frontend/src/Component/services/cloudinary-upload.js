// convert blob URL into blob
const fetchBlobFromUrl = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
};

// for upload file url to cloudinary
async function handleBlobImages(image) {
  if (!image) return false;

  // convert into blob to file
  let file;
  if (image.startsWith("blob:")) {
    const blob = await fetchBlobFromUrl(image);
    file = new File([blob], 'image.jpg', { type: blob.type });
  } else {
    file = image;
  }

  return file;

}

export async function addFilterToImage(imageSrc , imageFilter){
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // apply css filters via canvas
      ctx.filter = imageFilter;
      ctx.drawImage(image, 0, 0);

      const filteredImageUrl = canvas.toDataURL("image/jpeg");
      resolve(filteredImageUrl);
    };
  });
}


export async function uplodadToColudinary(image , preset){
  const file = await handleBlobImages(image)
  const formData = new FormData();
  formData.append('file' , file)
  formData.append('upload_preset' , preset);
  try{
    const res = await fetch(process.env.REACT_APP_COLUDINARY_URL , {
      method : "POST" ,
      body : formData
    });

    const data = await res.json();

    if(res.ok){
      return data.url;
    }
    return false;
  }catch(err){
    return false;
  }

}
