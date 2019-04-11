import React, { Component, Fragment } from 'react';
import './App.css';
import { Parallax } from 'react-spring';
import Page from './page.js';
import Countdown from 'react-countdown-now';

let currentPage = 1;

const ThePartyIsNow = () => <Fragment>The party has started!</Fragment>;

const renderer = ({ hours, minutes, seconds,  completed }) => {
    if (completed) {
        return <ThePartyIsNow/>;
    } else {
        return <Fragment>Friday, April 12th @ 7PM  (starts in {hours}h {minutes}m {seconds}s)</Fragment>;
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        this.launchDialerOnLastPage = true;
        this.pages = [
            {
                gradient: "cyan",
                hint: "!",
                caption: '"It takes two"',
                first: "David & Tersia's combined party!",
            },
            {
                gradient: "teal",
                hint: "?",
                caption: "Location, Date & Time",
                first: "Location: 26 Hardekool St",
                second: (
                    <Countdown date={Date.parse('2019-04-12T19:00:00.000Z')} renderer={renderer}/>
                ),
            },
            {
                gradient: "tomato",
                hint: "%",
                caption: "What to bring",
                first: "Your party pants.",
                second: "(seriously, bring pants)",
            },
            // {
            //     gradient: "pink",
            //     hint: "2",
            //     caption: "Sleeping arrangements",
            //     first: "If you need to ",
            //     second: "& Enjoy the drinks / people / snacks",
            // },
            {
                gradient: "cyan",
                hint: "@",
                caption: "RSVP - Confirmation of attendance",
                first: "WhatsApp Pawel",
                rightNavText: "072 662 0007",
            },
        ];
    }

    scrollTo = (to) => {
    };

    scrollNext() {
        this.refs.parallax.scrollTo(currentPage++);
        if (currentPage > this.pages.length) {
            currentPage = this.pages.length;
            if (this.launchDialerOnLastPage) {
                window.open("tel:0726620007");
            }
        }
    }

    scrollPrevious() {
        currentPage = currentPage - 1;
        if (currentPage < 1) {
            currentPage = 1;
        }
        this.refs.parallax.scrollTo(currentPage - 1);
    }

    componentDidMount() {
        this.addTouchEvents();
    }

    componentWillUnmount() {
        this.removeTouchEvents();
    }

    flag = 0;
    lastKnownX = 0;
    lastKnownY = 0;

    downListener = (event) => {
        this.flag = 0;

        // console.log(event);

        if (event.touches) {
            this.lastKnownX = event.touches[0].clientX;
            this.lastKnownY = event.touches[0].clientY;
        }
    };

    moveListener = (event) => {
        this.flag = 1;

        // console.log(event);
    };

    releaseListener = event => {
        // console.log(event);

        if (this.flag === 0) {
            this.handleClickOutside(event);
        } else if (this.flag === 1) {
            // console.log("drag");
        }
    };

    addTouchEvents() {
        document.addEventListener("mousedown", this.downListener, false);
        document.addEventListener("touchstart", this.downListener, false);

        document.addEventListener("mousemove", this.moveListener, false);
        document.addEventListener("touchmove", this.moveListener, false);

        document.addEventListener("mouseup", this.releaseListener, false);
        document.addEventListener("touchend", this.releaseListener, false);
    }

    removeTouchEvents() {
        document.removeEventListener("mousedown", this.downListener);
        document.removeEventListener("touchstart", this.downListener);

        document.removeEventListener("mousemove", this.moveListener);
        document.removeEventListener("touchmove", this.moveListener);

        document.removeEventListener("mouseup", this.releaseListener);
        document.removeEventListener("touchend", this.releaseListener);
    }

    handleClickOutside = (event) => {
        const eventLocationHorizontal = this.getEventLocationHorizontal(event);
        const eventLocationVertical = this.getEventLocationVertical(event);

        console.log(eventLocationHorizontal, eventLocationVertical);
        if (eventLocationHorizontal === 'RIGHT' && eventLocationVertical === 'BOTTOM') {
            this.scrollNext();

            event.preventDefault();
            event.stopPropagation();
        } else if (eventLocationHorizontal === 'LEFT' && eventLocationVertical === 'BOTTOM') {
            this.scrollPrevious();

            event.preventDefault();
            event.stopPropagation();
        }
    };


    getEventLocationHorizontal(event) {
        const windowWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (windowWidth / 2 > (event.pageX || this.lastKnownX)) {
            return 'LEFT';
        } else {
            return 'RIGHT';
        }
    }

    getEventLocationVertical(event) {
        const windowHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        if (windowHeight / 2 > (event.pageY || this.lastKnownY)) {
            return 'TOP';
        } else {
            return 'BOTTOM';
        }
    }

    render() {
        return (
            <Parallax className="container" ref="parallax" pages={this.pages.length} horizontal scrolling={false}>
                {
                    this.pages.map((item, index) => {
                        return <Page offset={index}
                                     gradient={item.gradient}
                                     hint={item.hint}
                                     caption={item.caption}
                                     first={typeof (item.first) === 'function' ? item.first() : item.first}
                                     second={item.second}
                                     secondLink={item.secondLink}
                                     rightNavText={item.rightNavText}
                                     isLastItem={index === this.pages.length - 1}
                                     scrollTo={this.scrollTo}/>
                    })
                }
            </Parallax>
        )
    }
}

export default App;
