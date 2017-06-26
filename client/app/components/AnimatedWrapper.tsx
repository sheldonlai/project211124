import * as React from "react";
import * as Animated from "animated/lib/targets/react-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import {Component} from "react";

const AnimatedWrapper = WrappedComponent => class AnimatedWrapper extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            animate: new Animated.Value(0)
        };
    }
    componentWillAppear(cb) {
        Animated.spring(this.state.animate, { toValue: 1 }).start();
        cb();
    }
    componentWillEnter(cb) {
        setTimeout(
            () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
            250
        );
        cb();
    }
    componentWillLeave(cb) {
        Animated.spring(this.state.animate, { toValue: 0 }).start();
        setTimeout(() => cb(), 175);
    }
    render() {
        const style = {
            opacity: Animated.template`${this.state.animate}`,
            transform: Animated.template`
    translate3d(0,${this.state.animate.interpolate({
                inputRange: [0, 1],
                outputRange: ["12px", "0px"]
            })},0)
   `
        };
        return (
            <Animated.div style={style} className="animated-page-wrapper">
                <WrappedComponent {...this.props} />
            </Animated.div>
        );
    }
};
export default AnimatedWrapper;