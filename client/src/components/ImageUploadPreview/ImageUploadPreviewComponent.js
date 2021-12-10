import React, { Fragment, useState } from 'react';


import './imageUploadPreviewStyles.scss';
 
const ImageUploadPreviewComponent = ({label, customClass, inputKey, onChangeHandler}, ref) => {
    const fileObj = [];
    const fileArray = [];
    const [files, SetFiles] = useState([]);

    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        console.log(fileArray);
        SetFiles(fileArray);
        onChangeHandler(inputKey, fileArray);
    }

    return (
        <Fragment>
            <div className="form-group multi-preview m-0">
                {   files.length > 0 &&
                    <div className="grid-images mb-2">
                        {files.map((url, index) => (
                                <img src={url} alt="..." key={index} />
                        ))}
                    </div>
                }
            </div>
            <div className="form-group image-upload-preview">
                { label && <label>Images</label> }
                <input 
                    type="file" 
                    className={`form-control ${customClass && customClass}`} 
                    multiple
                    ref={ref} 
                    onChange={(event) => uploadMultipleFiles(event)} 
                />
            </div>
        </Fragment >
    )
}

const ImageUploadPreview = React.forwardRef(ImageUploadPreviewComponent);

export default ImageUploadPreview;