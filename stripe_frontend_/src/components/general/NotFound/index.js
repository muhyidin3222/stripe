import React from 'react'
import PageviewIcon from '@material-ui/icons/Pageview';

import notFoundScss from 'assets/scss/notFound.module.scss'

export default function index () {
    return (
        <div className={notFoundScss.container}>
            <div className={notFoundScss.content} fontSize="large">
                <PageviewIcon className={notFoundScss.icon} />
                <div className={notFoundScss.title}> No results found</div>
                <div className={notFoundScss.dec}> There aren't any results for that query.</div>
            </div>
        </div>
    )
}