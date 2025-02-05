import styled from "styled-components";

export const MobileMenu_Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.blackTransparent};
  z-index: 2;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.9s ease-in-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

export const MobileMenu_Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 55vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.green};
  z-index: 3;
  padding: 30vh 0 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform 0.9s ease-in-out, opacity 0.9s ease-in-out;

  @media screen and (min-width: 768px) {
    width: 40vw;
    padding: 30vh 0 64px;
  }
`;
