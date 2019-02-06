
export const desktopWrapperStyle = {
    position: 'relative',
    bottom: '20px',
    right: '20px',
    zIndex: 2147483647,
    borderRadius: '20px',
    fontWeight: 'bold',
    background: 'rgb(255, 255, 255)',
    boxSizing: 'content-box',
    overflow: 'hidden'
};

export const desktopClosedWrapperStyleChat = {
    position: 'relative',
    bottom: '0px',
    right: '0px',
    zIndex: 2147483647,
    minWidth: '360px',
    boxSizing: 'content-box',
    overflow: 'hidden',
    minHeight: '90px'
};

export const mobileClosedWrapperStyle = {
    position: 'relative',
    bottom: 18,
    right: 18,
    zIndex: 2147483647,
    borderRadius: '50%',
    background: 'rgb(255, 255, 255)',
    boxSizing: 'content-box'
};

export const mobileOpenWrapperStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2147483647,
    width: '100%',
    height: '100%',
    background: 'rgb(255, 255, 255)',
    overflowY: 'visible',
    boxSizing: 'content-box'
};

export const desktopTitleStyle = {
    height: '40px',
    lineHeight: '30px',
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0 5px 20px',
    color: '#fff',
    cursor: 'pointer'
};

export const mobileTitleStyle = {
    height: 52,
    width: 52,
    cursor: 'pointer',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};
