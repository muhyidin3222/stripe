import React from 'react'
import { Button, TextField, Box, TableCell, TableRow, InputLabel } from '@material-ui/core';
import useStyles from './styles'

export default function Index (props) {
    const classes = useStyles();
    const { label, id, defaultValue,required, className, InputProps, onChange, margin, name, size, variant } = props
    return (
        <div>
            {/* <InputLabel>{label || ""}</InputLabel> */}
            <TextField
                label={label || "Normal"}
                id="outlined-margin-normal"
                defaultValue={defaultValue || ""}
                className={className || ""}
                InputProps={{
                    classes: {
                        input: classes.fontSize
                    },
                    ...InputProps
                }}
                // classes={}
                required={required}
                onChange={onChange || (() => { })}
                margin={margin || "normal"}
                name={name || ""}
                size={size || "small"}
                variant={variant || "outlined"}
            />
        </div>
    )
}
