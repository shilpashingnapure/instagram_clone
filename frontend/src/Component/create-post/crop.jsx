export const CropImage = ({ image, imageFilter })  => {
    return (
        <div className="w-[100%] h-[100%]">
      <img
        src={image}
        alt=""
        className="w-[100%] h-[100%] object-cover"
        style={{ filter: imageFilter }}
      />
    </div>
    )
}