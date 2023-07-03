import { Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

// const PageLoading = () => {
//   return <div className="loading --hide" />;
// };

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  top: 0;
  left: 0; */
`;
const PageLoading = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default PageLoading;
