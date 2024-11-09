// https://docs.opencv.org/4.x/dd/dfc/tutorial_js_grabcut.html

export const convertImage = (src, alpha, beta) => {
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0); // A除去
  src.convertTo(src, -1, alpha, beta);
};

export const removeBackground = (src, iterCount = 1, alpha = 1.0, beta = 0) => {
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0); // A除去
  if (alpha != 1.0 || beta != 0) {
    src.convertTo(src, -1, alpha, beta);
  }
  
  const mask = new cv.Mat(); // マスク用のMatを作成
  const bgdModel = new cv.Mat(); // 背景モデルを作成
  const fgdModel = new cv.Mat(); // 前景モデルを作成

  // 前景の初期矩形（手動で設定する必要あり）
  const gap = 1;
  const rect = new cv.Rect(gap, gap, src.cols - gap, src.rows - gap);

  // GrabCutアルゴリズムを適用
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, iterCount, cv.GC_INIT_WITH_RECT);

  cv.cvtColor(src, src, cv.COLOR_RGB2RGBA, 0); // A追加

  // マスクを更新して背景を除去
  for (let i = 0; i < mask.rows; i++) {
    for (let j = 0; j < mask.cols; j++) {
      if (mask.ucharPtr(i, j)[0] === 0 || mask.ucharPtr(i, j)[0] === 2) { // 背景または疑似背景
        const p = src.ucharPtr(i, j);
        p[0] = 255; // 白で透明にする処理
        p[1] = 255;
        p[2] = 255;
        p[3] = 0;
      }
    }
  }
  mask.delete();

  bgdModel.delete();
  fgdModel.delete();
};
