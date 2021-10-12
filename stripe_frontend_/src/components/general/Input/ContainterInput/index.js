import React from 'react'

import HeaderInput from 'components/general/Header/HeaderInput'

import scssContainerInput from 'assets/scss/general/containerInput.module.scss'

export default function Index ({ titleRight, rightContent, children, onClick }) {
    return (
        <div>
            <HeaderInput
                titleRight={titleRight}
                onClick={onClick}
            >
                {rightContent}
            </HeaderInput>
            <div className={scssContainerInput.content}>
                <div className={scssContainerInput.contentChild}>
                    {children}
                </div>
            </div>
        </div>
    )
}