import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import WestIcon from "@mui/icons-material/West";
import { updateStatusforReload } from "../../redux/postReducer";
import { steps } from "./create-post-data";
import { ImageUploader } from "./uploader";
import { CropImage } from "./crop";
import { EditImage } from "./edit";
import { ShareImage } from "./share";
import {
  addFilterToImage,
  uplodadToColudinary,
} from "../services/cloudinary-upload";
import { methodPost } from "../services/api_call";
import { storeNewPost } from "../../redux/userReducer";

export const CreatePost = ({ open, onClose }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageFilter, setImageFilter] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const [discardPop, setDiscardPop] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function updateImageWithFilter(filter) {
    setImageFilter(filter);
  }

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep() {
    if (currentStep === 1) {
      setDiscardPop(true);
      return;
    }
    setCurrentStep((prev) => prev - 1);
  }

  // handle to get cloudinary url for storing into db
  async function handleSharePost() {
    setLoading(() => true);
    let image = imageSrc;
    if (imageFilter) {
      image = await addFilterToImage(imageSrc, imageFilter);
    }

    const cloudinaryUrl = await uplodadToColudinary(image, process.env.REACT_APP_COLUDINARY_UPLOAD_PRESET_POST);

    if (cloudinaryUrl) {
      createPost(cloudinaryUrl, "photo");
    }
  }

  // store post in db
  async function createPost(url, type) {
    const { res } = await methodPost("/post", {
      caption,
      media: [{ type, url }],
    });
    if (res.ok) {
      dispatch(updateStatusforReload());
      dispatch(storeNewPost({ post : res.data }))
    }

    onClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth={steps[currentStep].width}
      >
        <DialogTitle
          className={`flex items-center h-[40px] capitalize border-b-2 ${
            currentStep === 0 ? "justify-center" : "justify-between"
          }`}
          sx={{ fontSize: "15px", fontWeight: 600 }}
        >
          {steps[currentStep].isPrev && (
            <button onClick={handlePrevStep}>
              <WestIcon />
            </button>
          )}
          <div>{steps[currentStep].title}</div>
          {steps[currentStep].isNext && (
            <button className="text-blue-600" onClick={handleNextStep}>
              Next
            </button>
          )}
          {steps.length - 1 === currentStep && (
            <button className="text-blue-600" onClick={handleSharePost}>
              Share
            </button>
          )}
        </DialogTitle>
        <DialogContent sx={{ padding: 0, height: steps[currentStep].height }}>
          {/* broswer the image from files */}
          {currentStep === 0 && (
            <ImageUploader
              setImageSrc={setImageSrc}
              moveNext={handleNextStep}
            />
          )}

          {/* show image after get from broswer */}
          {currentStep === 1 && (
            <CropImage image={imageSrc} imageFilter={imageFilter} />
          )}

          {/* edit image (filters for image) */}
          {currentStep === 2 && (
            <EditImage
              image={imageSrc}
              imageFilter={imageFilter}
              updateImageWithFilter={updateImageWithFilter}
            />
          )}

          {/* share image */}
          {currentStep === 3 && (
            <ShareImage
              image={imageSrc}
              imageFilter={imageFilter}
              setCaption={setCaption}
              caption={caption}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* cancel or exit popup */}
      <Dialog open={discardPop}>
        <DialogContent>
          <div className="flex gap-4 flex-col">
            <h1 className="text-[30px]">Discard Post</h1>
            <p className="text-[var(--mute-color)] mt-[-10px] text-[17px]">Are you sure you want to discard this post ?</p>
            <div className="flex justify-end gap-3">
              <button className="px-5 py-2 bg-[var(--primary-background)] text-white rounded-md" onClick={onClose}>
                OK
              </button>
              <button
                className="px-5 py-2 bg-gray-100 rounded-md"
                onClick={() => setDiscardPop(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* popup for loading  */}
      <Dialog open={loading}>
        <DialogTitle>
        <CircularProgress />
        </DialogTitle>
      </Dialog>
    </div>
  );
};



