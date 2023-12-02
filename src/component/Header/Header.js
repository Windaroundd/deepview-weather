import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import '../../css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTempUnit } from '../../redux-toolkit/weatherSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let dispatch = useDispatch();
  let { tempUnit } = useSelector((state) => {
    return state.weatherSlice;
  });

  return (
    <>
      {' '}
      <div className='header'>
        <div>
          <Button className='header-search__btn' onClick={handleOpen}>
            Search city...
          </Button>
        </div>
        <div>
          <Button
            className='header-search__btn'
            onClick={() => {
              dispatch(setTempUnit('metric'));
            }}
            style={{
              backgroundColor: tempUnit === 'metric' ? 'black' : '',
              color: tempUnit === 'metric' ? 'white' : '',
            }}
          >
            &deg;C
          </Button>
          <Button
            className='header-search__btn'
            onClick={() => {
              dispatch(setTempUnit('imperial'));
            }}
            style={{
              backgroundColor: tempUnit === 'imperial' ? 'black' : '',
              color: tempUnit === 'imperial' ? 'white' : '',
            }}
          >
            &deg;F
          </Button>
        </div>
      </div>{' '}
      <div className=''>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <h1>Hello</h1>
          </Box>
        </Modal>
      </div>
    </>
  );
}
