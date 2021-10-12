import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 12,
        padding: '4px 8px',
        border: '0px solid',
        lineHeight: 1.5,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Ubuntu",
            "sans-serif"
        ]
    },
})(Button);

export default function Index (props) {
    const { onClick, variant, color, disable, children, style } = props
    return (
        <BootstrapButton
            style={style || {}}
            onClick={onClick || (() => { })}
            variant={variant || "contained"}
            color={color || ""}
            disableRipple
            disable={disable}
        >
            {children}
        </BootstrapButton>
    )
}
