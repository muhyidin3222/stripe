import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { loginUser } from 'actions'
import { Modal, Form, Input, Button, Select, Checkbox, Row, Col, Collapse, Typography, message, Card } from 'antd';

//component
import ArchIntroLayout from 'components/layout/ArchIntroLayout'
import { verifyAuth } from 'redux/actions'

//style
import useStyles from 'assets/style/page/auth'
import { cryptoEncrypt } from 'utils/crypto'
import { loginService } from 'services/auth'
import { useHistory } from 'react-router-dom';
import { setCookie, getCookie } from 'utils/cookies'
import { useDispatch } from 'react-redux';

const Login = () => {
  // const [showPassword, setShowPassword] = useState(false)
  const [form] = Form.useForm();
  const history = useHistory()
  const disputes = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showpublic_key, setshowpublic_key] = useState(false)
  const [showsecret_key, setshowsecret_key] = useState(false)
  const [errorshowpublic_key, seterrorshowpublic_key] = useState(false)
  const [errorshowsecret_key, seterrorshowsecret_key] = useState(false)
  const [emailshowsecret_key, setemailshowsecret_key] = useState(false)


  const [dataInput, setdataInput] = useState({
    public_key: "",
    email: "",
    secret_key: ""
  })

  const submit = async () => {
    const errorshowpublickey = dataInput?.public_key?.length > 80 && (dataInput?.public_key?.includes("pk_live_51") || dataInput?.public_key?.includes("pk_test_51")) ? false : true
    const errorshowsecretkey = dataInput?.secret_key?.length > 100 && (dataInput?.secret_key?.includes("sk_live_51") || dataInput?.secret_key?.includes("sk_test_51")) ? false : true
    const emailshowsecretkey = dataInput?.email?.length && dataInput?.email?.includes(".com") ? false : true

    seterrorshowpublic_key(errorshowpublickey)
    seterrorshowsecret_key(errorshowsecretkey)
    setemailshowsecret_key(emailshowsecretkey)
    setLoading(true)
    try {
      console.log(!errorshowpublickey, !errorshowsecretkey, !emailshowsecretkey)
      if (!errorshowpublickey && !errorshowsecretkey && !emailshowsecretkey) {
        const dataCryptoEncrypt = await cryptoEncrypt(dataInput)
        // console.log(dataCryptoEncrypt)
        const resLogin = await loginService({ dataEncrypt: dataCryptoEncrypt })
        if (resLogin?.data?.payload) {
          console.log(resLogin?.data?.payload?.token)
          await setCookie('token', resLogin?.data?.payload?.token, 1)
          await setCookie('public_key', dataInput?.public_key, 1)
          await disputes(verifyAuth(true))
          await message.success("success login")
          await history.push("/customers/main")
          setdataInput({
            public_key: "",
            email: "",
            secret_key: ""
          })
          // window.location.reload();
        }
      } else {
        message.error("invalid input")
      }
    } catch (error) {
      message.error(error?.response?.data?.payload)
      console.log(error)
    }
    setLoading(false)
  }

  const classes = useStyles();

  const onChange = e => {
    setdataInput({
      ...dataInput,
      [e.target.name]: e.target.value
    })


    const errorshowpublickey = dataInput?.public_key?.length > 80 && (dataInput?.public_key?.includes("pk_live_51") || dataInput?.public_key?.includes("pk_test_51")) ? false : true
    const errorshowsecretkey = dataInput?.secret_key?.length > 100 && (dataInput?.secret_key?.includes("sk_live_51") || dataInput?.secret_key?.includes("sk_test_51")) ? false : true
    const emailshowsecretkey = dataInput?.email?.length && dataInput?.email?.includes(".com") ? false : true

    if (dataInput?.public_key?.length >= 1) seterrorshowpublic_key(errorshowpublickey)
    if (dataInput?.secret_key?.length >= 1) seterrorshowsecret_key(errorshowsecretkey)
    if (dataInput?.email?.length >= 1) setemailshowsecret_key(emailshowsecretkey)
  }

  // console.log(dataInput)
  console.log(errorshowpublic_key, showpublic_key ? "error" : dataInput?.public_key?.length ? "success" : "")

  return (
    <ArchIntroLayout title="Sign in">
      <div
        className={classes.form}
      >
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={submit}
            size="large"
          >
            <Form.Item
              id="email"
              label="Email"
              name="email"
              validateStatus={emailshowsecret_key ? "error" : dataInput?.public_key?.length ? "success" : ""}
              className={classes.marginInputTop}
              rules={[{ required: true, message: 'email is required' }]}
            >
              <Input
                value={dataInput?.email}
                onChange={onChange}
                name="email"
                size="large"
              />
            </Form.Item>


            <Form.Item
              name="public_key"
              label="Public Key"
              id="showpublic_key"
              hasFeedback
              validateStatus={errorshowpublic_key ? "error" : dataInput?.public_key?.length ? "success" : ""}
              validateFirst={showpublic_key}
              className={classes.marginInputTop}
              rules={[{ required: true, message: 'email is required' }]}
              help={errorshowpublic_key}
            >
              <Input.Password
                value={dataInput?.public_key}
                onChange={onChange}
                name="public_key"
                id="error"
                size="large"
              />
            </Form.Item>


            <Form.Item
              id="showsecret_key"
              name="secret_key"
              label="Secret Key"
              hasFeedback
              validateStatus={errorshowsecret_key ? "error" : dataInput?.showsecret_key?.length ? "success" : ""}
              validateFirst={showsecret_key}
              className={classes.marginInputTop}
              rules={[{ required: true, message: 'email is required' }]}
              help={emailshowsecret_key}
            >
              <Input.Password
                value={dataInput?.secret_key}
                onChange={onChange}
                name="secret_key"
                id="showsecret_key"
                size="large"
              />
            </Form.Item>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: 30 }}
              // onClick={submit}
              loading={loading}
            >
              Sign In
            </Button>

          </Form>
        </Card>
      </div>
    </ArchIntroLayout>
  )
}
export default Login