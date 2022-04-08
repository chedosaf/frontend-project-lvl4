// @ts-check
import React from 'react';
import {
  Container, ListGroup, Dropdown, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channelsSlice.js';
import getters from '../selectors/channelsSelectors.js';

const ChannelsBar = (props) => {
  const { showModal } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const storeChannels = useSelector(getters.getChannels);
  const activeChannel = useSelector(getters.getCurrentChannelId);
  const makeActive = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <>
      {' '}
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button type="button" className="p-0 ml-1 btn btn-group-vertical" onClick={() => showModal('adding')}>
        &nbsp;&nbsp;+&nbsp;&nbsp;
        </Button>
      </Container>
      <ListGroup className="flex-column nav-pills nav-fill px-2">

        {storeChannels.map((item) => {
          const btnClass = cn('w-100', 'rounded-0', 'text-start', 'text-truncat', 'btn', {
            'btn-secondary': item.id === activeChannel,
          });
          if (!item.removable) {
            return (
              <ListGroup.Item key={item.id} className="w-100 p-0" onClick={() => makeActive(item.id)}>
                <Button variant="flat" type="button" className={btnClass} style={{ overflow: 'hidden' }}>
                  <span className="me-1">#</span>
                  {item.name}
                </Button>
              </ListGroup.Item>
            );
          } return (
            <ListGroup.Item key={item.id} className="w-100 p-0" onClick={() => makeActive(item.id)}>
              <Container role="group" className="d-flex dropdown btn-group p-0">
                <Button variant="flat" type="button" className={btnClass} style={{ overflow: 'hidden' }}>
                  <span className="me-1">#</span>
                  {item.name}
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic"><span className="visually-hidden">Управление каналом</span></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item role="button" href="#/action-1" onClick={() => showModal('removing', item)}>{t('delete')}</Dropdown.Item>
                    <Dropdown.Item role="button" href="#/action-2" onClick={() => showModal('renaming', item)}>{t('rename')}</Dropdown.Item>
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
