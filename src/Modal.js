import styled from 'styled-components'

const Modal = styled.dialog`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.85);

    .modal-overlay {
        width: 100%;
        height: 100%;
        position:absolute;
        top: 0;
        left: 0;
    }

    .modal-close {
        position: fixed;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 1.25em;
        padding: 7px;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
    }

    img {
        margin: auto;
        display: block;
        max-width: 100%;
        max-height: 80%;
        height: auto;
        width: auto;
        z-index: 2;
    }

    .modal-caption {
        color: #fff;
        z-index: 3;
        font-size: 1.0em;
        position: absolute;
        bottom: 0px;
        width: 50%;
        text-align: center;
        padding: 25px;

        a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default Modal