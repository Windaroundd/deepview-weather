import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import '../../css/header.css';
import { weatherService } from '../../services/weatherService';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tempUnitState } from '../../recoil/atom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [locationName, setLocationName] = useState('');
  let [locationSuggestList, setLocationSuggestList] = useState();
  let naigate = useNavigate();
  let [tempUnit, setTempUnit] = useRecoilState(tempUnitState);

  const getWeatherByLocation = (locationName) => {
    if (locationName) {
      weatherService
        .getCoordinatesByLocation({ q: locationName, limit: 5 })
        .then((res) => {
          setLocationSuggestList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
              setTempUnit('metric');
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
              setTempUnit('imperial');
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
        <Modal open={open} onClose={handleClose}>
          <Box className='header-search__modal' sx={style}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getWeatherByLocation(locationName);
              }}
            >
              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                Enter to submit
              </label>
              <input
                name='search__input'
                className='header-search__input'
                type='text'
                value={locationName}
                onChange={(e) => {
                  setLocationName(e.target.value);
                }}
              />
            </form>
            <hr />
            <p>Suggestions</p>
            <div className='header-search__list'>
              {locationSuggestList?.map((item) => {
                return (
                  <div
                    key={item.lat}
                    className='header-search__item'
                    role='button'
                    onClick={() => {
                      naigate(`/search?lat=${item.lat}&lon=${item.lon}`);
                      handleClose();
                    }}
                  >
                    {item.name}, {item.country}
                  </div>
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
