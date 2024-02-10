import React from 'react';
import { LinearProgress } from '@mui/material';
import {useLoading} from "~/context/LoadingContext";

const TopProgressBar = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <LinearProgress style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1500 }} />
  );
};

export default TopProgressBar;
