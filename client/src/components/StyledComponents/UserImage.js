import React from 'react';
import styled from 'styled-components';

const UserProfileContainer = styled.div`
    display: ${props => props.display ? props.display : 'initial'};
    > img{
        width: ${props => props.width ? props.width : "100%"};
        height: ${props => props.height ? props.height : "100%"};
        border-radius: ${props => props.borderRadius ? props.borderRadius : '0'};
    }
`;

const UserImage = ({ styleObject, urlPath, userName }) => {
    return (
        <UserProfileContainer
            display={styleObject && styleObject.display}
            width={styleObject && styleObject.width}
            height={styleObject && styleObject.height}
            borderRadius={styleObject && styleObject.borderRadius}
        >
            <img src={urlPath} alt={userName}/>
        </UserProfileContainer>
    )
}
export default UserImage;