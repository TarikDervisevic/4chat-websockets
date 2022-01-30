import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ScreenSizeProvider = (props) => {
    const dispatch = useDispatch();

    const updateScreenSize = (screenSize) => {
        dispatch({
            type: "setScreenSize",
            payload: {
                screenSize: screenSize
            }
        })
    };

    const mediumBreakpoint = 1150;
    const smallBreakpoint = 700;
    const extraSmallBreakpoint = 500;

    useEffect(() => {
        setTimeout(() => {  // setTimeout because window.innerWidth returns wrong value without it
            if (window.innerWidth < mediumBreakpoint && window.innerWidth > smallBreakpoint) 
        {
            updateScreenSize("medium")
        }
            if (window.innerWidth < smallBreakpoint && window.innerWidth > extraSmallBreakpoint) 
        {
            updateScreenSize("small")
        } else if (window.innerWidth < extraSmallBreakpoint) {
            updateScreenSize("extraSmall")
        }
        }, 1);
        window.addEventListener("resize", () => {
            if (window.innerWidth < smallBreakpoint && window.innerWidth > extraSmallBreakpoint) 
        {
            updateScreenSize("small")
        } else if (window.innerWidth < extraSmallBreakpoint) {
            updateScreenSize("extraSmall")
        } else if (window.innerWidth > smallBreakpoint && window.innerWidth < mediumBreakpoint) {
            updateScreenSize("medium")
        } else if (window.innerWidth > mediumBreakpoint) {
            updateScreenSize("large")
        }
        });
        return () => window.removeEventListener("resize", () => {
            if (window.innerWidth < smallBreakpoint && window.innerWidth > extraSmallBreakpoint) 
        {
            updateScreenSize("small")
        } else if (window.innerWidth < extraSmallBreakpoint) {
            updateScreenSize("extraSmall")
        } else if (window.innerWidth > smallBreakpoint && window.innerWidth < mediumBreakpoint) {
            updateScreenSize("medium")
        } else if (window.innerWidth > mediumBreakpoint) {
            updateScreenSize("large")
        }
        });
    });
    return null;
}

export default ScreenSizeProvider;