import React, { useState, Fragment } from 'react'
import { Button, Modal, Checkbox, DatePicker, Col, Row } from 'antd';
import moment from 'moment';
import { ExportOutlined } from '@ant-design/icons'
import xlsx from 'json-as-xlsx'

const { RangePicker } = DatePicker;

export default function Index (props) {
    const { onGetApi, title, dataColumn, selectDataProps } = props
    const [showExport, setShowExport] = useState(false)
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [selectData, setSelectData] = useState(selectDataProps || [])

    const onClose = () => {
        setShowExport(false)
        setSelectData([])
    }

    const selectDownload = async ({ dataDonwload }) => {
        var settings = {
            sheetName: 'First sheet',
            fileName: title,
            extraLength: 3,
            writeOptions: {}
        }
        await xlsx(selectData, dataDonwload, settings)
    }

    const okModal = async () => {
        setShowExport(true)
        setLoading(true)
        try {
            let dataParamGetApi = {
                created: {
                }
            }
            if (startDate && endDate) {
                dataParamGetApi.created.gte = moment(startDate).unix()
                dataParamGetApi.created.lte = moment(endDate).unix()
                const resDownload = await onGetApi(dataParamGetApi)
                await selectDownload({ dataDonwload: resDownload?.data?.payload?.data })
                setStartDate(null)
                setEndDate(null)

                setShowExport(false)
            }
        } catch (error) {
            console.log(error)

            setLoading(false)
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
        const checkTarget = selectData.find(val => val.key === param.key)
        if (checkTarget?.key) {
            setSelectData(selectData.filter(val => val.key !== param.key))
        } else {
            setSelectData([...selectData, param])
        }
    }

    console.log(selectData)

    return (
        <Fragment>
            <Button
                size="small"
                onClick={() => setShowExport(true)}
                icon={<ExportOutlined />}
                style={{ marginLeft: 10 }}
            >Export</Button>

            <Modal
                title={"Donwload " + title}
                visible={showExport}
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
                                <Checkbox
                                    value={value.key}
                                    key={index}
                                    onClick={() => onClickRadio(value)}
                                    checked={selectData.find(val => val.key === value.key)?.key ? true : false}
                                >{value.label}</Checkbox>
                            </Col>
                        ))
                    }
                </Row>
            </Modal >
        </Fragment>
    )
}
