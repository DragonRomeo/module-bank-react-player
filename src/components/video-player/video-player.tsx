import { useMachine } from '@xstate/react';
import {
  ArrowsAltOutlined,
  PauseOutlined,
  ShrinkOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';

import { Button, Modal, Tooltip } from 'antd';
import ReactPlayer from 'react-player';
import {
  fullHeightPx,
  fullWidthPx,
  inspect,
  miniHeightPx,
  miniWidthPx,
  url,
} from './video-player.consts';
import { styles } from './video-player.styles';
import { playerMachine } from './playerMachine';

const VideoPlayer = () => {
  const [state, send] = useMachine(playerMachine, {
    inspect,
  });
  const isFullScreen = state.matches({ open: 'full' });
  const isPlaying = state.matches({
    open: {
      full: 'playing',
    },
  });
  const isPaused = state.matches({
    open: {
      full: 'paused',
    },
  });

  const toggleModal = () => {
    send({ type: 'toggleModal' });
  };

  const handleToggle = () => {
    send({ type: 'toggle' });
  };

  const handlePlayPause = () => {
    switch (true) {
      case isPlaying:
        send({ type: 'pause' });
        break;
      case isPaused:
        send({ type: 'play' });
        break;
    }
  };

  return (
    <>
      <h1>Video Player</h1>
      <div style={styles.fake_player}>
        <Tooltip title='Play'>
          <Button
            style={styles.fake_player__button}
            shape='circle'
            icon={<StepForwardOutlined />}
            onClick={toggleModal}
          />
        </Tooltip>
        <Modal
          width={isFullScreen ? fullWidthPx : miniWidthPx}
          title='Player'
          centered={true}
          open={state.matches('open')}
          onOk={toggleModal}
          onCancel={toggleModal}
          footer={
            <>
              <Button
                key='toggle'
                size='large'
                shape='circle'
                onClick={handleToggle}
                icon={isFullScreen ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
              ></Button>

              {isFullScreen ? (
                <Button
                  key='play'
                  size='large'
                  shape='circle'
                  onClick={handlePlayPause}
                  icon={isPlaying ? <PauseOutlined /> : <StepForwardOutlined />}
                ></Button>
              ) : (
                <></>
              )}
            </>
          }
        >
          <div style={styles.react_player_wrapper}>
            <ReactPlayer
              playing={state.matches({
                open: {
                  full: 'playing',
                },
              })}
              loop={true}
              src={url}
              width={isFullScreen ? fullWidthPx : miniWidthPx}
              height={isFullScreen ? fullHeightPx : miniHeightPx}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VideoPlayer;
