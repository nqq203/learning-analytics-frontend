import styled from "styled-components";
import { Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Close as CloseIcon } from '@mui/icons-material';

export const TitleWrapper = styled.div`
  width: 70%;
  height: 80%;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 24px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 30%;
`

// Styles using styled-components
export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: transparent;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
  height: 75px;
`;

export const ActionButton = styled(Button)`
  background-color: var(--primary-500);
  color: white;
  width: 10%;
  height: 80%;
`;

export const FormControlStyled = styled(FormControl)`
  margin: 10px 0;
  min-width: 120px;
`;


export const TableWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  font-size: 24px;
  color: #000;
  padding: 5px;
  border-radius: 50%;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InformationWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`

export const InformationItem = styled.span`
  padding-left: 20px;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 700;
`