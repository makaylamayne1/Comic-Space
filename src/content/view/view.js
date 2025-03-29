import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import './view.css'; // Assuming styles are set as above
import ChooseChapter from '../chapterdivision/choosechapter';
const View = ({ fileUrl}) => {
    //also we will make it possible to add to collections 
    
    return (
        <div className="viewer-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                </div>
                <Viewer fileUrl={fileUrl}  />
            </Worker>  
        </div>
    );
};

export default View;
