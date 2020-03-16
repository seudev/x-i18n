import React from 'react';

import Examples from './Examples';
import { useI18n } from '../../src';

export default props => {
    const i18n = useI18n();

    return (
        <main>
            <Examples />
            <div id="x-i18n-state">
                <h2>i18n state</h2>
                <pre>
                    <code>{JSON.stringify(i18n, null, 4)}</code>
                </pre>
            </div>
        </main>
    );

}
