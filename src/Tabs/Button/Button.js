import React from 'react';
import PropTypes from 'prop-types';
import RippleAnimate from "./RippleAnimate";
import styled from "styled-components";

const ButtonWrapper = styled.div`
    width: 400px;
    height: 400px
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding: 1em;
    overflow: hidden;
    background: #ec407a;
    color: white;
    user-select: none;
    
    :hover {
        background: #f06292;
    }
`;

class Button extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {ripples: []};
    }

    render() {
        return (
            <ButtonWrapper
                className="Button"
                {...this.props}
                onClick={(e) => {
                    this.props.onClick();
                    const left = e.pageX - e.currentTarget.offsetLeft;
                    const top = e.pageY - e.currentTarget.offsetTop;
                    const id = Math.random().toString();
                    const ripples = [...this.state.ripples, {left, top, id}];
                    this.setState({ripples});
                }}
            >
                {this.props.children}
                {this.state.ripples.map(({left, top, id}) =>
                    <RippleAnimate
                        left={`${left}px`}
                        top={`${top}px`}
                        key={id}
                        onRequestRemove={() => {
                            this.setState(state => ({
                                ripples: state.ripples.filter(x => x.id !== id),
                            }))
                        }}
                    />
                )}
            </ButtonWrapper>
        );
    }
}

export default Button;