import { Component } from 'react';

import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xi18n, setLang, tryUseNavigatorLang } from './i18nActions';

var stateGetter = null;
var initialState = null;

const importInitialState = async () => {
    initialState = (await import('./i18nReducer')).INITIAL_STATE;
};

export const getState = () => {
    if (stateGetter) {
        return stateGetter().i18n;
    } else if (!initialState) {
        importInitialState();
    }
    return initialState;
};

export const setStateGetter = getState => {
    stateGetter = getState;
};

export const getCurrentLang = () => {
    const i18n = getState();
    return i18n.lang.current;
};

export const formatDate = (date, options, lang) => {
    if (date instanceof Date) {
        return date.toLocaleDateString(lang || getCurrentLang(), options || {});
    } else if (date instanceof DateTime) {
        return date.setLocale(lang || getCurrentLang()).toLocaleString(options || {});
    }
};

class I18n extends Component {

    componentWillMount() {
        const { init, tryUseNavigatorLang, lang, xi18n, setLang, _tryUseNavigatorLang } = this.props;
        if (init) {
            xi18n(init);
        }
        if (lang) {
            const promise = setLang(lang);
            if (tryUseNavigatorLang) {
                promise.catch(e => {
                    _tryUseNavigatorLang();
                });
            }
        } else if (tryUseNavigatorLang) {
            _tryUseNavigatorLang();
        }
    }

    render() {
        return false;
    }
}

I18n.propTypes = {
    init: PropTypes.shape({
        fallback: PropTypes.shape({
            id: PropTypes.string,
            messages: PropTypes.object
        }).isRequired,
        all: PropTypes.arrayOf(PropTypes.string).isRequired,
        messagesProvider: PropTypes.func,
    }),
    lang: PropTypes.string,
    tryUseNavigatorLang: PropTypes.bool
};

const mapStateToProps = state => ({
    i18n: state.i18n
});

const mapDispatchToProps = dispatch => bindActionCreators({
    xi18n,
    setLang,
    _tryUseNavigatorLang: tryUseNavigatorLang
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(I18n);
