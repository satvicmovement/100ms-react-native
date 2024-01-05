const createRequests = (base: String) => {
  const statusObject = {
    REQUEST: `${base}_REQUEST`,
    SUCCESS: `${base}_SUCCESS`,
    FAILED: `${base}_FAILED`,
  };
  return statusObject;
};

const ADD_MESSAGE = createRequests('ADD_MESSAGE');

const ADD_PINNED_MESSAGES = createRequests('ADD_PINNED_MESSAGES');

const CLEAR_MESSAGE_DATA = createRequests('CLEAR_MESSAGE_DATA');

const SET_PEER_STATE = 'SET_PEER_STATE';

const CLEAR_PEER_DATA = createRequests('CLEAR_PEER_DATA');

const SAVE_USER_DATA = createRequests('SAVE_USER_DATA');

const SET_HMS_INSTANCE = 'SET_HMS_INSTANCE';

const CLEAR_HMS_INSTANCE = 'CLEAR_HMS_INSTANCE';

const CHANGE_PIP_MODE_STATUS = 'CHANGE_PIP_MODE_STATUS';

const RESET_JOIN_CONFIG = 'RESET_JOIN_CONFIG';

const CHANGE_MIRROR_CAMERA = 'CHANGE_MIRROR_CAMERA';

const CHANGE_SHOW_STATS = 'CHANGE_SHOW_STATS'; // RTC Stats

const CHANGE_SHOW_HLS_STATS = 'CHANGE_SHOW_HLS_STATS'; // HLS Stats

const CHANGE_ENABLE_HLS_PLAYER_CONTROLS = 'CHANGE_ENABLE_HLS_PLAYER_CONTROLS'; // HLS Stats

const CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS =
  'CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS';

const CHANGE_AUTO_SIMULCAST = 'CHANGE_AUTO_SIMULCAST';

const SET_RTC_STATS = 'SET_RTC_STATS';

const CHANGE_HLS_ASPECT_RATIO = 'CHANGE_HLS_ASPECT_RATIO';

const SET_MODAL_TYPE = 'SET_MODAL_TYPE';

const SET_PEER_TO_UPDATE = 'SET_PEER_TO_UPDATE';

const SET_MEETING_STATE = 'SET_MEETING_STATE';

const SET_INSET_VIEW_MINIMIZED = 'SET_INSET_VIEW_MINIMIZED';

const SET_MINI_VIEW_PEERTRACKNODE = 'SET_MINI_VIEW_PEERTRACKNODE';

const UPDATE_MINI_VIEW_PEERTRACKNODE = 'UPDATE_MINI_VIEW_PEERTRACKNODE';

const SET_FULLSCREEN_PEERTRACKNODE = 'SET_FULLSCREEN_PEERTRACKNODE';

const UPDATE_FULLSCREEN_PEERTRACKNODE = 'UPDATE_FULLSCREEN_PEERTRACKNODE';

const SET_LOCAL_PEERTRACKNODE = 'SET_LOCAL_PEERTRACKNODE';

const UPDATE_LOCAL_PEERTRACKNODE = 'UPDATE_LOCAL_PEERTRACKNODE';

const SET_STARTING_HLS_STREAM = 'SET_STARTING_HLS_STREAM';

const SET_GRID_VIEW_ACTIVE_PAGE = 'SET_GRID_VIEW_ACTIVE_PAGE';

const SET_STARTING_OR_STOPPING_RECORDING = 'SET_STARTING_OR_STOPPING_RECORDING';

const ADD_SCREENSHARE_TILE = 'ADD_SCREENSHARE_TILE';

const REMOVE_SCREENSHARE_TILE = 'REMOVE_SCREENSHARE_TILE';

const UPDATE_SCREENSHARE_TILE = 'UPDATE_SCREENSHARE_TILE';

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const SET_ACTIVE_CHAT_BOTTOM_SHEET_TAB = 'SET_ACTIVE_CHAT_BOTTOM_SHEET_TAB';

const SET_CHAT_FILTER_SHEET_VISIBLE = 'SET_CHAT_FILTER_SHEET_VISIBLE';

const SET_CHAT_MORE_ACTIONS_SHEET_VISIBLE =
  'SET_CHAT_MORE_ACTIONS_SHEET_VISIBLE';

const SET_CHAT_STATE = 'SET_CHAT_STATE';

const SET_HANDLE_BACK_BUTTON = 'SET_HANDLE_BACK_BUTTON';

const SET_AUTO_ENTER_PIP_MODE = 'SET_AUTO_ENTER_PIP_MODE';

const SET_EDIT_USERNAME_DISABLED = 'SET_EDIT_USERNAME_DISABLED';

const SET_SELECTED_MESSAGE_FOR_ACTION = 'SET_SELECTED_MESSAGE_FOR_ACTION';

const SET_INITIAL_ROLE = 'SET_INITIAL_ROLE';

const SET_CHAT_PEER_BLACKLIST = 'SET_CHAT_PEER_BLACKLIST';

const FILTER_OUT_BLOCKED_MSGS = 'FILTER_OUT_BLOCKED_MSGS';

export default {
  ADD_PINNED_MESSAGES,
  ADD_MESSAGE,
  CLEAR_MESSAGE_DATA,
  CLEAR_PEER_DATA,
  SET_PEER_STATE,
  SAVE_USER_DATA,
  SET_HMS_INSTANCE,
  CLEAR_HMS_INSTANCE,
  CHANGE_PIP_MODE_STATUS,
  RESET_JOIN_CONFIG,
  CHANGE_MIRROR_CAMERA,
  CHANGE_SHOW_STATS,
  CHANGE_AUTO_SIMULCAST,
  CHANGE_SHOW_HLS_STATS,
  CHANGE_ENABLE_HLS_PLAYER_CONTROLS,
  CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS,
  CHANGE_HLS_ASPECT_RATIO,
  SET_RTC_STATS,
  SET_MODAL_TYPE,
  SET_PEER_TO_UPDATE,
  SET_MEETING_STATE,
  SET_INSET_VIEW_MINIMIZED,
  SET_MINI_VIEW_PEERTRACKNODE,
  UPDATE_MINI_VIEW_PEERTRACKNODE,
  SET_FULLSCREEN_PEERTRACKNODE,
  UPDATE_FULLSCREEN_PEERTRACKNODE,
  SET_LOCAL_PEERTRACKNODE,
  UPDATE_LOCAL_PEERTRACKNODE,
  SET_STARTING_HLS_STREAM,
  SET_GRID_VIEW_ACTIVE_PAGE,
  SET_STARTING_OR_STOPPING_RECORDING,
  ADD_SCREENSHARE_TILE,
  REMOVE_SCREENSHARE_TILE,
  UPDATE_SCREENSHARE_TILE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_ACTIVE_CHAT_BOTTOM_SHEET_TAB,
  SET_CHAT_FILTER_SHEET_VISIBLE,
  SET_CHAT_MORE_ACTIONS_SHEET_VISIBLE,
  SET_CHAT_STATE,
  SET_HANDLE_BACK_BUTTON,
  SET_AUTO_ENTER_PIP_MODE,
  SET_EDIT_USERNAME_DISABLED,
  SET_SELECTED_MESSAGE_FOR_ACTION,
  SET_INITIAL_ROLE,
  SET_CHAT_PEER_BLACKLIST,
  FILTER_OUT_BLOCKED_MSGS,
};

export enum HmsStateActionTypes {
  CLEAR_STATES = 'CLEAR_STATES',
  SET_PREBUILT_DATA = 'SET_PREBUILT_DATA',
  SET_ON_LEAVE_HANDLER = 'SET_ON_LEAVE_HANDLER',
  SET_ROOM_STATE = 'SET_ROOM_STATE',
  SET_LOCAL_PEER_STATE = 'SET_LOCAL_PEER_STATE',
  SET_ROLES_STATE = 'SET_ROLES_STATE',
  SET_IS_LOCAL_AUDIO_MUTED_STATE = 'SET_IS_LOCAL_AUDIO_MUTED_STATE',
  SET_IS_LOCAL_VIDEO_MUTED_STATE = 'SET_IS_LOCAL_VIDEO_MUTED_STATE',
  SET_IS_LOCAL_SCREEN_SHARED_STATE = 'SET_IS_LOCAL_SCREEN_SHARED_STATE',
  SET_ROOM_LOCALLY_MUTED = 'SET_ROOM_LOCALLY_MUTED',
  SET_USER_NAME = 'SET_USER_NAME',
  ADD_TO_PREVIEW_PEERS_LIST = 'ADD_TO_PREVIEW_PEERS_LIST',
  REMOVE_FROM_PREVIEW_PEERS_LIST = 'REMOVE_FROM_PREVIEW_PEERS_LIST',
  SET_LAYOUT_CONFIG = 'SET_LAYOUT_CONFIG',
  SET_ROLE_CHANGE_REQUEST = 'SET_ROLE_CHANGE_REQUEST',
  ADD_PARTICIPANT = 'ADD_PARTICIPANT',
  ADD_PARTICIPANTS = 'ADD_PARTICIPANTS',
  REMOVE_PARTICIPANT = 'REMOVE_PARTICIPANT',
  REMOVE_PARTICIPANTS = 'REMOVE_PARTICIPANTS',
  UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT',
  REPLACE_PARTICIPANTS_LIST = 'REPLACE_PARTICIPANTS_LIST',
  SET_ACTIVE_SPEAKERS = 'SET_ACTIVE_SPEAKERS',
  SET_RECONNECTING = 'SET_RECONNECTING',
  SET_INITIAL_ROLE = 'SET_INITIAL_ROLE',
}
