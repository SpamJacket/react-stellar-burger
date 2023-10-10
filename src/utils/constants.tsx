const BASE_URL: string = "https://norma.nomoreparties.space/api";

const endpoints: { ingredientsUrl: string; ordersUrl: string } = {
  ingredientsUrl: "/ingredients",
  ordersUrl: "/orders",
};

const BASE_WS_ORDERS_URL: string = "wss://norma.nomoreparties.space/orders";

const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

const ADD_TO_CONSTRUCTOR_LIST: "ADD_TO_CONSTRUCTOR_LIST" =
  "ADD_TO_CONSTRUCTOR_LIST";
const DELETE_FROM_CONSTRUCTOR_LIST: "DELETE_FROM_CONSTRUCTOR_LIST" =
  "DELETE_FROM_CONSTRUCTOR_LIST";
const CLEAN_CONSTRUCTOR_LIST: "CLEAN_CONSTRUCTOR_LIST" =
  "CLEAN_CONSTRUCTOR_LIST";
const SET_FILINGS: "SET_FILINGS" = "SET_FILINGS";

const PLACE_ORDER_REQUEST: "PLACE_ORDER_REQUEST" = "PLACE_ORDER_REQUEST";
const PLACE_ORDER_SUCCESS: "PLACE_ORDER_SUCCESS" = "PLACE_ORDER_SUCCESS";
const PLACE_ORDER_FAILED: "PLACE_ORDER_FAILED" = "PLACE_ORDER_FAILED";

const SET_USER: "SET_USER" = "SET_USER";
const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

const FEED_CONNECT: "FEED_CONNECT" = "FEED_CONNECT";
const FEED_DISCONNECT: "FEED_DISCONNECT" = "FEED_DISCONNECT";
const FEED_WS_CONNECTING: "FEED_WS_CONNECTING" = "FEED_WS_CONNECTING";
const FEED_WS_OPEN: "FEED_WS_OPEN" = "FEED_WS_OPEN";
const FEED_WS_CLOSE: "FEED_WS_CLOSE" = "FEED_WS_CLOSE";
const FEED_WS_ERROR: "FEED_WS_ERROR" = "FEED_WS_ERROR";
const FEED_WS_MESSAGE: "FEED_WS_MESSAGE" = "FEED_WS_MESSAGE";

const ORDERS_CONNECT: "ORDERS_CONNECT" = "ORDERS_CONNECT";
const ORDERS_DISCONNECT: "ORDERS_DISCONNECT" = "ORDERS_DISCONNECT";
const ORDERS_WS_CONNECTING: "ORDERS_WS_CONNECTING" = "ORDERS_WS_CONNECTING";
const ORDERS_WS_OPEN: "ORDERS_WS_OPEN" = "ORDERS_WS_OPEN";
const ORDERS_WS_CLOSE: "ORDERS_WS_CLOSE" = "ORDERS_WS_CLOSE";
const ORDERS_WS_ERROR: "ORDERS_WS_ERROR" = "ORDERS_WS_ERROR";
const ORDERS_WS_MESSAGE: "ORDERS_WS_MESSAGE" = "ORDERS_WS_MESSAGE";

const PLACE_ORDER_VIEW_REQUEST: "PLACE_ORDER_VIEW_REQUEST" =
  "PLACE_ORDER_VIEW_REQUEST";
const SET_ORDER_VIEW: "SET_ORDER_VIEW" = "SET_ORDER_VIEW";
const PLACE_ORDER_VIEW_FAILED: "PLACE_ORDER_VIEW_FAILED" =
  "PLACE_ORDER_VIEW_FAILED";
const CLEAN_ORDER_VIEW: "CLEAN_ORDER_VIEW" = "CLEAN_ORDER_VIEW";

const orderAcceptBackground = (
  <>
    <svg
      style={{ position: "absolute", top: "0", left: "4px" }}
      width="98"
      height="102"
      viewBox="0 0 98 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.36637 37.3873C-1.45546 45.5044 -1.45545 56.4957 4.36637 64.6127L24.3336 92.4518C30.1554 100.569 40.4748 103.965 49.8947 100.865L82.2023 90.2313C91.6223 87.1309 98 78.2387 98 68.2055V33.7945C98 23.7612 91.6222 14.8691 82.2023 11.7687L49.8947 1.13508C40.4748 -1.96536 30.1554 1.43114 24.3336 9.54819L4.36637 37.3873Z"
        fill="url(#paint0_radial_311_17)"
        fillOpacity="0.25"
      />
      <defs>
        <radialGradient
          id="paint0_radial_311_17"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(49 51) rotate(-46.1458) scale(70.7248 53.2019)"
        >
          <stop stopColor="#801AB3" stopOpacity="0" />
          <stop offset="1" stopColor="#4C4CFF" />
        </radialGradient>
      </defs>
    </svg>
    <svg
      style={{ position: "absolute", top: "1px", left: "0" }}
      width="107"
      height="100"
      viewBox="0 0 107 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.944 38.453C108.019 45.5983 108.019 54.4017 103.944 61.547L88.5996 88.453C84.5247 95.5983 76.994 100 68.8442 100H38.1558C30.006 100 22.4753 95.5983 18.4004 88.453L3.05617 61.547C-1.01872 54.4017 -1.01872 45.5983 3.05617 38.453L18.4004 11.547C22.4753 4.40169 30.006 0 38.1558 0L68.8442 0C76.994 0 84.5247 4.40169 88.5996 11.547L103.944 38.453Z"
        fill="url(#paint0_radial_311_18)"
        fillOpacity="0.25"
      />
      <defs>
        <radialGradient
          id="paint0_radial_311_18"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.5 50) rotate(-43.0632) scale(73.2274 55.0025)"
        >
          <stop stopColor="#801AB3" stopOpacity="0" />
          <stop offset="1" stopColor="#4C4CFF" />
        </radialGradient>
      </defs>
    </svg>
    <svg
      style={{ position: "absolute", top: "18px", left: "19px" }}
      width="68"
      height="66"
      viewBox="0 0 68 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9249 2.91091C30.3362 -0.970307 37.6638 -0.970302 43.0751 2.91092L61.6345 16.2224C67.0459 20.1036 69.3102 26.9832 67.2433 33.2632L60.1542 54.8016C58.0873 61.0815 52.1592 65.3333 45.4703 65.3333H22.5296C15.8408 65.3333 9.91274 61.0815 7.84578 54.8016L0.756717 33.2632C-1.31024 26.9832 0.954096 20.1036 6.36546 16.2224L24.9249 2.91091Z"
        fill="url(#paint0_radial_311_24)"
        fillOpacity="0.25"
      />
      <defs>
        <radialGradient
          id="paint0_radial_311_24"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(34 32.6667) rotate(136.146) scale(47.1499 35.4679)"
        >
          <stop stopColor="#801AB3" stopOpacity="0" />
          <stop offset="1" stopColor="#4C4CFF" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  </>
);

export {
  BASE_URL,
  endpoints,
  BASE_WS_ORDERS_URL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_TO_CONSTRUCTOR_LIST,
  DELETE_FROM_CONSTRUCTOR_LIST,
  CLEAN_CONSTRUCTOR_LIST,
  SET_FILINGS,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  SET_USER,
  SET_AUTH_CHECKED,
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  PLACE_ORDER_VIEW_REQUEST,
  SET_ORDER_VIEW,
  PLACE_ORDER_VIEW_FAILED,
  CLEAN_ORDER_VIEW,
  orderAcceptBackground,
};