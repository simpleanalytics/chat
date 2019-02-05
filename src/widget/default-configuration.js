export const defaultConfiguration = {
    titleClosed: 'Re-open chat',
    titleOpen: 'Ask me anything',
    closedStyle: 'button', // button or chat
    closedChatAvatarUrl: '', // only used if closedStyle is set to 'chat'
    cookieExpiration: 1, // in days. Once opened, closed chat title will be shown as button (when closedStyle is set to 'chat')
    introMessage: 'Hello! My name is Adriaan. How can I help?',
    introMessageBalloon: 'Hello! How can I help?',
    closedChatAvatarUrl: 'https://cdn.simpleanalytics.io/adriaan.jpg',
    autoResponse: 'Looking for Adriaan (this might take a minute)',
    autoNoResponse: 'It seems that Adriaan is not available to answer right now. Please leave your email address so I can ' +
    'contact you, and I will get back to you as soon as I can.',
    placeholderText: 'Send a message...',
    displayMessageTime: true,
    mainColor: '#FF4F64',
    alwaysUseFloatingButton: false,
    desktopHeight: 450,
    desktopWidth: 300
};
