import React, { useRef } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import setCanvasPreview from './setCanvasPreview';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ImageCropDialog = ({ open, onClose, image, setImage, setImages }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = React.useState(null);

    const MIN_DIMENSION = 150;
    const ASPECT_RATIO = 1;

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop(
            { unit: "%", width: cropWidthInPercent },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleCropImage = () => {
        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        setImages((prev) => [...prev, dataUrl]);
        setImage(dataUrl); // Clear image state after saving
        onClose(); // Close dialog
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Crop Your Image</DialogTitle>
            <DialogContent>
                {image && (
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={image}
                            alt="Upload"
                            style={{ maxHeight: "70vh", width: '100%' }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
                {crop && (
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            display: "none",
                            width: 150,
                            height: 150,
                        }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCropImage} variant="contained" color="success">
                    Crop & Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageCropDialog;
