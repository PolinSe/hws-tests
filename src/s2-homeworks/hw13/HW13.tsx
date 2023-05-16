import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')

    const [isLoading, setIsLoading] = useState(false)



    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setIsLoading(true)

        const setFunction = (code: string, image: string, text: string, info: string) => {
            setCode(code)
            setImage(image)
            setText(text)
            setInfo(info)
            setIsLoading(false)
        }
        axios
            .post(url, {success: x})
            .then((res) => {

                setFunction('Код 200!', success200, res.data.errorText, res.data.info)

                // setCode('Код 200!')
                // setImage(success200)
                // setText(res.data.errorText)
                // setInfo(res.data.info)
                // setIsLoading(false)

            })
            .catch((e) => {

                if (e.response.status === 400) {
                    setFunction(
                        'Ошибка 400!',
                        error400,
                        "Ты не отправил success в body вообще!",
                        "ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!"
                    )

                    // setCode('Ошибка 400!')
                    // setImage(error400)
                    // setText("Ты не отправил success в body вообще!")
                    // setInfo("ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!")
                    // setIsLoading(false)

                } else if (e.response.status === 500) {
                    setFunction(
                        'Ошибка 500!',
                        error500,
                        "эмитация ошибки на сервере",
                        "ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных)"
                    )
                    // setCode('Ошибка 500!')
                    // setImage(error500)
                    // setText("эмитация ошибки на сервере")
                    // setInfo("ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных")
                    // setIsLoading(false)

                } else {
                    setFunction(
                        'Error!',
                        errorUnknown,
                        e.message,
                        e.name
                    )
                    // setCode('Error!')
                    // setImage(errorUnknown)
                    // setText(e.message)
                    // setInfo(e.name)
                    // setIsLoading(false)
                }
                // дописать

            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        disabled={isLoading}
                        // дописать

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={isLoading}
                        // дописать

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={isLoading}
                        // дописать

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        disabled={isLoading}
                        // дописать

                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
