import React, { Fragment, useState } from 'react';
import './imageUploadPreviewStyles.scss';
 
const ImageUploadPreviewComponent = ({label, customClass, inputKey, onChangeHandler}, ref) => {
    const fileObj = [];
    const fileArray = [];
    const [files, SetFiles] = useState([]);

    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            let fileName = URL.createObjectURL(fileObj[0][i]);
            toDataURL(fileName, function(dataUrl){
                fileArray.push(dataUrl);
                SetFiles(fileArray);
                onChangeHandler(inputKey, fileArray);
            })
        }
    }

    const toDataURL = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    return (
        <Fragment>
            <div>
                { files.length > 0 && label && <label className="d-block images-label">Images</label> }
                {   files.length > 0 &&
                    <div style={files.length > 4 ? { display:'none' } : { display:'block' }}>
                        {files.map((url, index) => (
                            <img src={url} alt="..." className="rounded shadow mr-3 mb-3" height="80" width="80" key={index} />
                        ))}
                    </div>
                }
            </div>
            <div className="form-group image-upload-preview">
                <button className={`btn btn-upload ${files.length > 4 ? 'border-danger' : ''}`}>Upload image</button>
                <input 
                    type="file" 
                    className={`form-control ${customClass && customClass}`} 
                    multiple
                    ref={ref}
                    onChange={ (event) => uploadMultipleFiles(event)} 
                />
                <div className="text-danger" style={files.length > 4 ? { display:'block' } : { display:'none' }}> Upload Max 4 Files allowed </div>  
            </div>
        </Fragment>
    )
}

const ImageUploadPreview = React.forwardRef(ImageUploadPreviewComponent);

export default ImageUploadPreview;