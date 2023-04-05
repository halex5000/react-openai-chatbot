import React from 'react';
import {UAParser} from 'ua-parser-js';
import {useFlags} from 'launchdarkly-react-client-sdk';
import {useAppStore} from '../store/app';

export default function UserAgent() {
	const parser = new UAParser();
	const browserInfo = parser.getResult();
	const addBrowserInfo = useAppStore((state) => state.addBrowserInfo);
	const updateAllowList = useAppStore((state) => state.updateAllowList);
	const {debugPanelAllowList} = useFlags();

	updateAllowList(debugPanelAllowList);

	addBrowserInfo(browserInfo);
	return <div />;
}
