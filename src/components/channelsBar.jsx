import React from 'react';
import {
  Container, ListGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../slices/channelsSlice.js';

const ChannelsBar = (props) => {
  const dispatch = useDispatch();
  const storeChannels = useSelector((state) => state.channels.channels);
  const { modalShow } = props;
  const activeChannel = useSelector((state) => state.channels.currentChannelId);
  const makeActive = (id) => {
    dispatch(setCurrentChannelId(id));
  };
  return (
    <>
      <Container md={2} className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={modalShow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </Container>
      <ListGroup className="flex-column nav-pills nav-fill px-2">
        {storeChannels.map((item) => {
          const btnClass = cn('w-100', 'rounded-0', 'text-start', 'text-truncat', 'btn', {
            'btn-secondary': item.id === activeChannel,
          });
          if (!item.removable) {
            return (
              <ListGroup.Item key={item.id} className="w-100 p-0" onClick={() => makeActive(item.id)}>
                <button type="button" className={btnClass}>
                  <span className="me-1">#</span>
                  {item.name}
                </button>
              </ListGroup.Item>
            );
          } return (
            <ListGroup.Item key={item.id} className="w-100" onClick={() => makeActive(item.id)}>
              <Container role="group" className="d-flex dropdown btn-group p-0">
                <button type="button" className={btnClass}>
                  <span className="me-1">{item.name}</span>
                </button>
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default ChannelsBar;
