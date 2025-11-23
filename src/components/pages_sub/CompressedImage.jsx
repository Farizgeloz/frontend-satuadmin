import { useState, useEffect } from "react";
import { Image as RBImage } from "react-bootstrap"; 

const compressImage = (url, maxWidth = 600) =>
  new Promise((resolve, reject) => {
    if (!url) return resolve(null);

    const img = new window.Image(); // pakai window.Image biar jelas
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      resolve(dataUrl);
    };
    img.onerror = reject;
    img.src = url;
  });

function CompressedImage({ src, ...props }) {
  const [compressed, setCompressed] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (src) {
      compressImage(src, 100).then((res) => {
        if (isMounted) setCompressed(res);
      });
    }
    return () => { isMounted = false; };
  }, [src]);

  return (
    <RBImage
      src={compressed || src} // fallback ke src asli sebelum selesai
      {...props}
    />
  );
}

export default CompressedImage;
