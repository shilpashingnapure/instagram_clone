import { Filters } from "./filters";

export const EditImage = ({ image, imageFilter, updateImageWithFilter }) => {
    function getSelectedFilter(filter) {
      updateImageWithFilter(filter);
    }
    return (
      <div className="flex gap-3 w-[100%] h-[100%]">
        <div className="w-[65%] border-r-2">
          <img
            src={image}
            alt=""
            className="w-[100%] h-[100%] object-cover"
            style={{ filter: imageFilter }}
          />
        </div>
        <div className="flex-1">
          <Filters getSelectedFilter={getSelectedFilter} />
        </div>
      </div>
    );
  };