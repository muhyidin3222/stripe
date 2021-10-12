import React, { useState } from 'react'
import { Button, Table, Modal, Input, Radio, DatePicker, Typography, Col, Row } from 'antd';
import { useDispatch } from 'react-redux'
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography

export default function Index (props) {
    const dispatch = useDispatch()
    const { modal, selectDownload, setModal, onGetApi, title, dataColumn, selectDataProps } = props
    // const [state, setstate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(moment().subtract('day', 1).format("YYYYMMDD"))
    const [endDate, setEndDate] = useState(moment().format("YYYYMMDD"))
    const [selectData, setSelectData] = useState(selectDataProps || [])

    const onClose = () => {
        setModal(false)
        setSelectData([])
    }
    const okModal = async () => {
        setModal(false)
        setLoading(true)
        try {
            let dataParamGetApi = {
                created: {
                }
            }
            if (startDate && endDate) {
                dataParamGetApi.created.gte = moment(startDate).format("YYYYMMDD")
                dataParamGetApi.created.lte = moment(endDate).format("YYYYMMDD")
                await dispatch(onGetApi(dataParamGetApi))
            }
            await selectDownload({ selectData })
            setStartDate(moment().subtract('day', 1).format("YYYYMMDD"))
            setEndDate(moment().format("YYYYMMDD"))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onChange = (dates) => {
        if (dates) {
            const [start, end] = dates
            setStartDate(start)
            setEndDate(end)
        } else {
            setStartDate("")
            setEndDate("")
        }
    };

    const onClickRadio = (param) => {
        // console.log(param)
        const checkTarget = selectData.find(val => val.key === param.key)
        if (checkTarget?.key) {
            setSelectData(selectData.filter(val => val.key !== param.key))
        } else {
            setSelectData([...selectData, param])
        }
    }

    console.log(selectData)

    return (
        <Modal
            title={"Donwload " + title}
            visible={modal}
            onOk={okModal}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={okModal}>
                    Download
                </Button>
            ]}
        >
            <RangePicker
                onChange={onChange}
                style={{ width: "100%" }}
                startDate={startDate}
                endDate={endDate}
            />
            <div level={5} style={{ marginTop: 15, fontWeight: "bold" }}>Columns</div>
            <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                {
                    dataColumn?.map((value, index) => (
                        <Col span={8}>
                            <Radio
                                value={value.key}
                                key={index}
                                onClick={() => onClickRadio(value)}
                                checked={selectData.find(val => val.key === value.key)?.key ? true : false}
                            >{value.label}</Radio>
                        </Col>
                    ))
                }
            </Row>
        </Modal >
    )
}
