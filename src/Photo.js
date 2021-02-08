import React, { useState, useRef, useImperativeHandle, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components'
import Modal from './Modal'
import { Img } from 'react-image'
import Close from './close.svg'
import Loading from './loading.svg'

const Thumb = styled.img`
    border-radius: 5px;
    cursor: zoom-in;
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-bottom: 16px;

    @media (hover: hover) {
        transition: 0.3s;
        :hover {
            filter: brightness(88%);
        }
    }
`;

const LoadingAnimation = <img src={Loading} alt="Loading" />

function Photo({ photo }){
    const { user, urls, alt_description } = photo;
    const ref = useRef();

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    const handleEscape = useCallback(event => {
        if (event.keyCode === 27) setIsOpen(false);
    }, []);

    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleEscape, false);
        return () => {
            document.removeEventListener('keydown', handleEscape, false);
        }
    }, [handleEscape, isOpen]);

    return (
        <div>
        <Thumb src={urls.small} alt={alt_description} onClick={() => ref.current.open()} />
        {createPortal(
            isOpen ?
            <Modal
                className="dialog"
                ref={ref}
                open
            >
            <div className="modal-overlay" onClick={() => ref.current.close()} />
            <span role="button" className="modal-close" aria-label="close" onClick={() => ref.current.close()}>
                <img src={Close} alt="Close" />
            </span>
            <Img src={urls.full} loader={LoadingAnimation} alt={alt_description} />
            <div className="modal-caption">
               by @<a href={user.links.html} target="_blank" rel="noreferrer">{user.username}</a>
            </div>
            </Modal> : null, document.body
        )}
        </div>
    );
};

export default Photo;