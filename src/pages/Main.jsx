import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import backGroundImg from '../assets/galaxy.jpg'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Main() {
  const [inputImage, setInputImage] = useState(null);
  const [message, setMessage] = useState('');
  const [inputImageUrl, setInputImageUrl] = useState('');
  const [outputImages, setOutputImages] = useState(null);
  const [loading, setLoading] = useState(false);

  function imageUpload(e) {
    e.preventDefault();
    console.log(inputImage);
    if (!inputImage) {
      setMessage('No Image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', inputImage);
    console.log(formData);
    setLoading(true);
    axios
      .post('http://localhost:5000/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        setOutputImages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function selectImage(e) {
    const file = e.target.files[0];
    setInputImage(file);
    console.log(file);
    const url = URL.createObjectURL(file);
    console.log('url', url);
    setInputImageUrl(url);
  }

  return  (
    <>
     {/* <img src={backGroundImg} className={"-z-10"}/> */}
      <div className="font-Montserrat flex items-center justify-around w-full h-[91.3vh] z-0  text-slate-100" >
        <div className="border-2 rounded border-zinc-400 w-4/12 h-[60vh] bg-slate-950 bg-opacity-[0.8]">
          <form onSubmit={imageUpload} className="flex flex-col h-full">
            <div className="border-b-2 p-1 border-zinc-400 w-full ">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Select File
                <VisuallyHiddenInput type="file" onChange={selectImage} multiple />
              </Button>
              <span className="ml-2">
                <Button variant="outlined" type="submit" onClick={imageUpload}>
                  Go {''}
                </Button>
              </span>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center">
              {inputImageUrl ? (
                <img className="w-2/3 h-2/3" src={inputImageUrl} alt="Uploaded" />
              ) : (
                <>
                <i className="text-[5rem] block mb-9 text-slate-200">
                  <FaCloudUploadAlt />
                </i>
                
                <p>Upload your image</p>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="border-2 rounded border-zinc-500 w-[42%] h-2/3 bg-slate-950 bg-opacity-[0.8] ">
          {loading? <span>Loading... </span>:outputImages ? (
            <ImageSelector
              loading={loading}
              setLoading={setLoading}
              outputImages={outputImages}
            ></ImageSelector>
          ) : (
            <p className=" font-Montserrat m-7">
              <p className='text-[45px] '>Unlock Hidden Craters in Lunar PSR Regions!</p>
              <br/>
              <p className='p-2'><span className='text-[20px] text-slate-300'>From contour detection to precise crater labeling, our app is your gateway to revealing the secrets of the moon's shadowed regions. Empower your research with enhanced imagery from ISRO’s Chandrayaan-2 OHRC.</span>
              </p>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function ImageSelector({ outputImages, loading, setLoading }) {
  const [img, setImg] = useState();

  useEffect(() => {
    if (!loading) setImg(outputImages.final);
  }, [loading, outputImages]);

  // Function to add a cache-busting query parameter to the image URL
  const cacheBust = (imgPath) => `${imgPath}?t=${new Date().getTime()}`;

  return (
    <div className='flex flex-col gap-3 mx-auto h-full'>
      <div className='mx-auto border-b-2 border-zinc-300 w-full p-2'>
        <span className="m-3">
          <Button variant="contained" onClick={() => setImg(outputImages.clahe)}>
            Clahe
          </Button>
        </span>
        <span className="m-2">
          <Button variant="contained" onClick={() => setImg(outputImages.denoised)}>
            Denoised
          </Button>
        </span>
        <span className="m-2">
          <Button variant="contained" onClick={() => setImg(outputImages.sharpened)}>
            Sharpened
          </Button>
        </span>
        <span className="m-2">
          <Button variant="contained" onClick={() => setImg(outputImages.contour)}>
            Contour
          </Button>
        </span> 
        <span className="m-2">
          <Button variant="contained" onClick={() => setImg(outputImages.final)}>
            Detection
          </Button>
        </span>
      </div>
      <div className='p-2 h-full'>
        {/* Apply cache-busting parameter when rendering the image */}
        {img && <img src={cacheBust(`http://localhost:5000/getImage/${img}`)} className=' h-[85%] w-2/3 mx-auto' alt="Output" />}
      </div>
    </div>
  );
}

export default Main;
