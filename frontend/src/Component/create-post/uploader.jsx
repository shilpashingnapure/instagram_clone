// ---------------------- Step one ----------------------------------------------

// pass image value , to get choose image in step one
export const ImageUploader = ({ setImageSrc, moveNext }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      moveNext();
    }
  };
  return (
    <div className="h-[100%] flex  justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <img src="./upload.png" alt="" width={100} height={100} />
        <p>Drag photos and videos here</p>
        <div className="relative overflow-hidden cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute left-0 top-0 opacity-0 cursor-pointer"
          />
          <button className="px-3 py-1 rounded-md bg-[var(--primary-background)] text-[#fff] font-bold ">
            Select from computer
          </button>
        </div>
      </div>
    </div>
  );
};
