import React from 'react'
import HW10 from '../../hw10/HW10'
import HW11 from '../../hw11/HW11'
import HW12 from '../../hw12/HW12'
import {Provider} from 'react-redux';
import store from '../../hw10/bll/store';
import HW13 from '../../hw13/HW13';
//import HW13 from '../../hw13/HW13'

function JuniorPlus() {
    return (
        <div id={'hw5-page-junior-plus'}>
            <HW10 />
            <HW11 />
            <Provider store={store}>
                <HW12 />
            </Provider>

            <HW13 />
        </div>
    )
}

export default JuniorPlus
