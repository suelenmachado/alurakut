import styled from 'styled-components';

const Box = styled.div`
    background: #F2E4E3;
    border-radius: 8px;
    padding: 16px;

    margin-bottom: 10px;
    .boxLink {
        font-size: 14px;
        color: #C01C73;
        text-decoration: none;
        font-weight: 800;
    }
    .title {
        font-size: 32px;
        font-wight: 400;
        margin-bottom: 20px
    }
    .smallTitle {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #CA519E;
        margin-bottom: 20px;
    }
    h1 {
        color: #CA519E;
    }
    h2 {
        color: #CA519E;
    }
    hr {
        margin-top: 12px;
        margin-bottom: 8px;
        border-color: transparent;
        border-bottom-color: #ECF2FA;
    }
    input{
        width: 100%;
        background-color: #F4F4F4;
        color: #CA519E;
        border: 0;
        padding: 14px 16px;
        margin-bottom: 14px;
        border radius: 10000px;
        ::placeholder{
            color: #CA519E;
            opacity: 1;
    }
    }
    button{
        border: 0;
        padding: 8px 12px;
        color: #F2E4E3;
        border-radius: 10000px;
        background-color: #C01C73;
    }

`;

export default Box