export const Media = ({ medias }) => {
    return (
      <div className="h-[70vh]">
        {medias.map((media) => {
          return <PostImg key={media.id} {...media} />;
        })}
      </div>
    );
  };
  
  const PostImg = ({ url }) => {
    return (
      <div className="h-[100%] flex items-center">
        <img src={url} className="w-[100%] h-[100%] object-cover" alt="" />
      </div>
    );
  };
  