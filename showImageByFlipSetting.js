export const showImageByFlipSetting = (bin) => {
  if (chk_flip.checked) {
    const flip = new cv.Mat();
    cv.flip(bin, flip, 1);
    cv.imshow("canvas", flip);
    flip.delete();
  } else {
    cv.imshow("canvas", bin);
  }
};
