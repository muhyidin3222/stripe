import React, { useState, useEffect } from 'react';
import ArchLayout from 'components/layout/ArchLayout'

// import { chargeStripe } from 'services/apiStripe'

export default () => {
    useEffect(() => {
        const getApiTest = async () => {
            try {
                console.log("resData")
                // chargeStripe()
                // console.log(resData)
            } catch (error) {
                console.log(error)
            }
        }
        getApiTest()
    }, [])
    return (
        <ArchLayout>
            home page
        </ArchLayout>
    )
}