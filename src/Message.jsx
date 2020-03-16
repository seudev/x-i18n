import React from 'react';

import PropTypes from 'prop-types';
import { useI18n } from './I18n';


const Message = props => {
    const { id, params, rawHtml } = props;
    const { getMessage } = useI18n();
    const message = getMessage(id, params, props.default);
    const messages = ((message instanceof Array) ? message : [message]);
    const ElementType = (props.as || React.Fragment);

    return (
        <React.Fragment>
            {messages.map((message, index) => {
                if (rawHtml) {
                    return (
                        <ElementType key={index} dangerouslySetInnerHTML={{ __html: message }} />
                    );
                }
                return (
                    <ElementType key={index}>{message}</ElementType>
                );
            })}
        </React.Fragment>
    );
};

Message.propTypes = {
    id: PropTypes.string,
    params: PropTypes.object,
    rawHtml: PropTypes.bool,
    default: PropTypes.string,
    as: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ]),
};

Message.defaultProps = {

};

export default Message;
