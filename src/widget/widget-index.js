import { h, render } from 'preact';
import Widget from './widget';
import {defaultConfiguration} from './default-configuration';

if (window.attachEvent) {
    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

function injectChat() {
    if (!window.intergramId) {
        console.error('Please set window.intergramId (see example at github.com/idoco/intergram)');
    } else {
        let root = document.createElement('div');
        root.id = 'intergramRoot';
        document.getElementById('intergramPlaceholder').appendChild(root);
        const server = window.intergramServer;
        const iFrameSrc = server + '/chat.html';
        const host = window.location.host || 'unknown-host';
        const conf = { ...defaultConfiguration, ...window.intergramCustomizations };

        render(
            <Widget intergramId={window.intergramId}
                    host={host}
                    isMobile={window.screen.width < 500}
                    iFrameSrc={iFrameSrc}
                    conf={conf}
            />,
            root
        );

        // try {
        //     const request = new XMLHttpRequest();
        //     request.open('POST', server + '/usage-start?host=' + host);
        //     if (request.overrideMimeType) request.overrideMimeType('text/plain');
        //     request.send(null);
        // } catch (e) { /* Fail silently */ }

    }

}
