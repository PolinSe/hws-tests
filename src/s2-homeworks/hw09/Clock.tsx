import React, {useState, MouseEvent} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        let id: number = window.setInterval(() => setDate(new Date(Date.now())), 1000)
        setTimerId(id)
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        clearInterval(timerId)
        setTimerId(undefined)
    }

    const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => { // пишут студенты // показать дату если наведена мышка
        e.preventDefault();
        setShow(true)
    }
    const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => { // пишут студенты // спрятать дату если мышка не наведена
        e.preventDefault();
        setShow(false)
    }

    // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringTime = date?.toLocaleTimeString('en-GB')

    // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем
    const stringDate = date?.toLocaleDateString('ru') || <br/>

    // день недели на английском (https://learn.javascript.ru/intl#intl-datetimeformat) // пишут студенты
    let formatter = new Intl.DateTimeFormat("en-US", {weekday: "long"});
    const stringDayToLowerCase = formatter.format(date)
    const stringDay = stringDayToLowerCase[0].toUpperCase() + stringDayToLowerCase.slice(1) || <br/>

    // месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat) // пишут студенты
    let formatter1 = new Intl.DateTimeFormat("en-US", {month: "long"});
    const stringMonth = formatter1.format(date)

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-date'}>{stringDate}</span>,{' '}
                            <span id={'hw9-month'}>{stringMonth}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId!==undefined} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    Start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId===undefined} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    Stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
