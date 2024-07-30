import { filtersMap } from "./create-post-data";

export const Filters = ({ getSelectedFilter }) => {
    return (
      <div className="grid grid-cols-3 ">
        <div
          className="mt-3 flex justify-center items-center border-2 "
          onClick={() => getSelectedFilter(null)}
        >
          <img
            src="https://www.siilc.edu.in/wp-content/themes/themify-ultra/themify/img/non-skin.gif"
            alt=""
          />
        </div>
        {filtersMap.map(({ name, filter }, index) => {
          return (
            <div onClick={() => getSelectedFilter(filter)}>
              <FilterName name={name} filter={filter} key={index} />
            </div>
          );
        })}
      </div>
    );
  };


  const FilterName = ({ name, filter }) => {
    return (
      <div className="flex mt-3 flex-col text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuN599ul5pe08c2y9XTbWltZqo8TFmk2DMHQ&s"
          alt=""
          style={{
            filter: filter,
            height: "80px",
            width: "100%",
            objectFit: "contain",
          }}
        />
        <span>{name}</span>
      </div>
    );
  };