import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Select, Typography } from 'antd';
// import { chargesListDispatch } from 'redux/actions'

const { Title } = Typography
const { Option } = Select;

export default (props) => {
    const dispatch = useDispatch()
    const { loading: { loadingCreate } } = useSelector(state => state)
    const { setShowModal, showModal } = props
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        email: ""
    })
    const handleOk = () => {
        submit()
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const submit = async (e) => {
        // await dispatch(chargesListDispatch(dataCreate))
        handleCancel()
    }

    const handleChange = () => {

    }
    return (
        <Modal
            title="Add a category to allow"
            size="small"
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>Businesses set their own merchant categories, which may be inaccurate. We recommend double-checking the category if a control did not work as expected.</div>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select one country"
                defaultValue={['ac_refrigeration_repair']}
                onChange={handleChange}
                optionLabelProp="label"
            >
                <Option value="china" label="China">
                    {["ac_refrigeration_repair"].map((value, index) => (
                        <div className="demo-option-label-item" key={index}>{value}</div>
                    ))}
                </Option>
            </Select>,
        </Modal>
    );
};