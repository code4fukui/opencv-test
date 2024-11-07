// https://docs.opencv.org/4.x/dd/dfc/tutorial_js_grabcut.html

export const removeBackground = (src, iterCount = 1) => {
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0); // A除去
  
  const mask = new cv.Mat(); // マスク用のMatを作成
  const bgdModel = new cv.Mat(); // 背景モデルを作成
  const fgdModel = new cv.Mat(); // 前景モデルを作成

  // 前景の初期矩形（手動で設定する必要あり）
  const gap = 1;
  const rect = new cv.Rect(gap, gap, src.cols - gap, src.rows - gap);

  // GrabCutアルゴリズムを適用
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, iterCount, cv.GC_INIT_WITH_RECT);

  // マスクを更新して背景を除去
  for (let i = 0; i < mask.rows; i++) {
    for (let j = 0; j < mask.cols; j++) {
      if (mask.ucharPtr(i, j)[0] === 0 || mask.ucharPtr(i, j)[0] === 2) { // 背景または疑似背景
        src.ucharPtr(i, j)[0] = 255; // 白または透明にする処理
        src.ucharPtr(i, j)[1] = 255;
        src.ucharPtr(i, j)[2] = 255;
      }
    }
  }
  mask.delete();

  bgdModel.delete();
  fgdModel.delete();
};
