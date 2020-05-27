
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin: 40px;
  border: 15px outset pink;
  &:hover {
   background-color: yellow;
 }
`;

const Paragraph = styled.p`
  font-size: 30px;
  text-align: center;
`;

const StyledExample = (props) => (
  <Div>
    <Paragraph>{props.text} </Paragraph>
  </Div>
);

export default StyledExample;