import { Comment } from "../common-component/comment";

export const Comments = ({ postId , comments, setShowAllComments }) => {
  if (comments?.length === 0) {
    return;
  }

  return (
    <div className="px-3">
      {comments.length > 3 && (
        <div className="text-[var(--mute-color)]">
          <button onClick={setShowAllComments}>
            View all {comments.length} Comments
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1">
        {comments.map((comment , index) => {
          if (index >= 3) {
            return null;
          }
          return (
            <div key={comment?.id}>
              <Comment
                comment={comment}
                commentUser={comment?.user}
                showAvtar={false}
                showTime={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
