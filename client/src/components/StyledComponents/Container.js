import styled from 'styled-components';

export const MainContainer =  styled.div`
    background-color: ${props => props.bgColor ? props.bgColor : "#fff"};
    padding: ${props => props.padding ? props.padding : "20px"};
    border-radius: ${props => props.borderRadius ? props.borderRadius : '10px'};
    box-shadow: ${props => props.boxShadow ? props.boxShadow : "none"}
`;