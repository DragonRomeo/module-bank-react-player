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
  const [state, send] = useMachine(playerMachine, { inspect });

  const isOpen = state.matches('open');
  const isFullScreen = state.matches({ open: 'full' });
  const isPlaying = state.context.isPlaying;

  const toggleModal = () => {
    send({ type: 'toggleModal' });
  };

  const handleToggle = () => {
    send({ type: 'toggle' });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      send({ type: 'pause' });
    } else {
      send({ type: 'play' });
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
          open={isOpen}
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
              />
              <Button
                key='play'
                size='large'
                shape='circle'
                onClick={handlePlayPause}
                icon={isPlaying ? <PauseOutlined /> : <StepForwardOutlined />}
              />
            </>
          }
        >
          <div style={styles.react_player_wrapper}>
            <ReactPlayer
              playing={isPlaying}
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
