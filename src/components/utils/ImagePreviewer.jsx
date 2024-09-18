import React, { useState, useRef, useEffect } from 'react';
import ImageCropDialog from './ImageCropDialog';
import { Button, Container, Typography, Box, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Reorder } from 'framer-motion';

const ImagePreviewer = ({ label, imagesForUpload, }) => {
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    // console.log(image);

    useEffect(() => {
        if (image) {
            const file = base64ToFile(image, `cropped-image-${Date.now()}.png`);

            imagesForUpload(file);
        }
    }, [image]);

    const base64ToFile = (base64, filename) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const onImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        console.log(file);
        
        imagesForUpload(file)
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < 150 || naturalHeight < 150) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImage("");
                }
                setImage(imageUrl);
                setOpenDialog(true);
            });
        });
        reader.readAsDataURL(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleReorder = (newImages) => {
        setImages(newImages);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 2, border: '', borderRadius: '5px' }}>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    {label}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '200px',
                        border: '2px dashed gray',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        mb: 2,
                    }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={onImageUpload}
                        style={{ display: 'none' }}
                    />
                    <IconButton color="primary" component="span">
                        <AddPhotoAlternateIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                </Box>
                {error && <Typography color="error">{error}</Typography>}

                <ImageCropDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    image={image}
                    setImage={setImage}
                    setImages={setImages}

                />

                <div className='mt-4'>
                    <Reorder.Group
                        onReorder={handleReorder}
                        values={images}
                        axis="x"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full"
                    >
                        {images.map((img, index) => (
                            <Reorder.Item
                                key={index}
                                value={img}
                                className="flex flex-col bg-gray-100 rounded-xl p-2"
                            >
                                <div className="flex justify-between items-center">
                                    <IconButton aria-label="drag-handle" className="cursor-grab">
                                        <DragIndicatorIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete-image"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <DeleteIcon className="text-gray-500" />
                                    </IconButton>
                                </div>
                                <img
                                    src={img}
                                    alt={`Cropped ${index}`}
                                    className='w-full rounded-b-xl object-cover'
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
            </Box>
        </Container>
    );
};

export default ImagePreviewer;
