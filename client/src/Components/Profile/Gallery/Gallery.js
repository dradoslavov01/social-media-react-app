import style from './Gallery.module.scss';
import { useState, useEffect } from 'react';
import { getPhotos, deletePhoto } from '../../../services';
import ClearIcon from '@material-ui/icons/Clear';



const Gallery = (props) => {
    const [photos, setPhotos] = useState([]);
    const [deleted, setDeleted] = useState(null);


    useEffect(() => {
        getPhotos()
            .then(res => {
                setPhotos(res.data);
            })
            .catch(err => console.log('Couldnt load photos'));
        setDeleted(null)
    }, [deleted, props.currentUpload])

    return (
        photos.slice(0).reverse().map(photo => {
            return (
                <div key={photo.id} className={style.singlePhoto}>
                    <img src={photo.url} alt='default' />
                    <ClearIcon className={style.deleteIcon} title="Delete photo" onClick={() => {
                        deletePhoto(photo.id);
                        setDeleted('')
                    }} />
                </div>
            )
        })
    );
}

export default Gallery;