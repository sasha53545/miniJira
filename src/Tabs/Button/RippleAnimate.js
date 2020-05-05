import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import moduleCss from './RippleAnimate.module.css';

const RippleWrapper = styled.div`
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    height: 8em;
    width: 8em;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-50%) translateY(-50%) scale(0.4);
    /* match durations with Ripple.js's DURATION */
    transition: transform 0.23s, background 0.23s;
`;

const DURATION = 230;

class RippleAnimate extends React.Component {
    static propTypes = {
        onRequestRemove: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {in: false, out: false};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({in: true, out: false});
            setTimeout(() => {
                this.setState({in: false, out: true});
                setTimeout(() => {
                    this.props.onRequestRemove();
                }, DURATION);
            }, DURATION);
        }, 15);
    }

    render() {
        let className = `Ripple`;

        if (this.state.in) {
            className = `${className} ${moduleCss.RippleIn}`;
        }
        if (this.state.out) {
            className = `${className} ${moduleCss.RippleOut}`;
        }

        const style = {};
        if (this.props.left) style.left = this.props.left;
        if (this.props.top) style.top = this.props.top;

        return (
            <RippleWrapper className={className} style={style} />
        );
    }
}

export default RippleAnimate;