export const defaultConfiguration = {
  titleClosed: "Re-open chat",
  titleOpen: "Ask me anything",
  closedStyle: "button", // button or chat
  closedChatAvatarUrl: "", // only used if closedStyle is set to 'chat'
  cookieExpiration: 1, // in days. Once opened, closed chat title will be shown as button (when closedStyle is set to 'chat')
  introMessage: "Hello! How can we help?",
  introMessageBalloon: "Hello! How can we help?",
  closedChatAvatarUrl:
    "https://cdn.simpleanalytics.io/images/adriaan-small.jpg",
  autoResponse: "Looking for Adriaan or Şamil (this might take a minute)",
  autoNoResponse:
    "They don't seem to answer within 60 seconds. This chat is anonymous so please leave your email address so they can " +
    "contact you.",
  placeholderText: "Send a message...",
  displayMessageTime: true,
  mainColor: "#FF4F64",
  alwaysUseFloatingButton: false,
  desktopHeight: 450,
  desktopWidth: 300
};
