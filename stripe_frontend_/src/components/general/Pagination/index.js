import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd';
import scssPagination from 'assets/scss/config.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

export default function Index ({ disableLeft, disableRight, dataList, getDataApi }) {
    const { loading: { loadingGet } } = useSelector(state => state)
    const [page, setPage] = useState(1);
    const [typeButton, setTypeButton] = useState("");
    const dispatch = useDispatch()

    const onPageData = async (type) => {
        if (type === "previous") {
            setPage(page - 1)
            setTypeButton("previous")
            await dispatch(getDataApi({
                limit: 10,
                starting_after: dataList[0]?.id
            }))
        } else {
            setTypeButton("next")
            setPage(page + 1)
            await dispatch(getDataApi({
                limit: 10,
                starting_after: dataList[dataList?.length - 1]?.id
            }))
        }
    }

    return (
        <div className={scssPagination.content}>
            <Button
                type="primary"
                shape="circle"
                loading={loadingGet && typeButton === "previous"}
                onClick={() => onPageData("previous")}
                icon={<ArrowLeftOutlined />}
                disabled={page === 1 || disableLeft || true}
                className={scssPagination.left}
            />
            <Button
                type="primary"
                shape="circle"
                loading={loadingGet && typeButton === "next"}
                disabled={(dataList?.length || 0) < 10 || disableRight}
                onClick={() => onPageData("next")}
                icon={<ArrowRightOutlined />}
                className={scssPagination.right}
            />
        </div>
    )
}