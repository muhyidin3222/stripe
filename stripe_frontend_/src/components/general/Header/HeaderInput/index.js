import React from 'react'
import Color from 'config/Color'
import CloseIcon from '@material-ui/icons/Close';
import { CloseOutlined } from '@ant-design/icons'
import config from 'assets/scss/config.module.scss'
import headerInput from 'assets/scss/general/headerInput.module.scss'

const { gray } = Color.Border

export default function Index ({ titleRight, children, onClick }) {
    return (
        <div className={headerInput.container}>
            <div className={headerInput.left} onClick={onClick}>
                <CloseOutlined />
                <div className={headerInput.wpText}>
                    <div className={headerInput.title}>{titleRight}</div>
                </div>
            </div>
            <div className={headerInput.right}>
                {children}
            </div>
        </div>
    )
}