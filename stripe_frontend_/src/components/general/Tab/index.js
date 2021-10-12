import React from 'react';
// import { AntTabsStyle, AntTabStyle, useStyles } from './style'

// export default function CustomizedTabs ({ handleChange, activeTab, tabList, children }) {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <div className={classes.demo1}>
//                 <AntTabsStyle value={activeTab} onChange={handleChange} aria-label="ant example">
//                     {
//                         tabList?.map((value, index) => (
//                             <AntTabStyle label={value.label} index={index} />
//                         ))
//                     }
//                 </AntTabsStyle>
//                 {children}
//             </div>
//         </div>
//     );
// }


import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback (key) {
    console.log(key);
}

export default ({ handleChange, activeTab, tabList, childrend }) => (
    <Tabs
        defaultActiveKey={activeTab}
        onChange={handleChange}
        size="small"
    >
        {
            tabList.map((value, index) => (
                <TabPane
                    tab={value.label}
                    key={index}
                    size="small"
                >
                    {childrend}
                </TabPane>
            ))
        }
    </Tabs>
);