import { useReducer } from 'react'

import DigitBtn from '@/components/DigitBtn'
import OperationBtn from '@/components/OperationBtn'

import ACTIONS from '@/ACTIONS'

import '@/assets/css/style.css'

function reducer(state, { type, payload })
{
    switch( type )
    {
        case ACTIONS.ADD_DIGIT:
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }
    }
}

function App()
{
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{ previousOperand } { operation }</div>
                <div className="current-operand">{ currentOperand }</div>
            </div>
            <button className="span-two">AC</button>
            <button>DEL</button>
            <OperationBtn operation='/' dispatch={dispatch} />
            <DigitBtn digit='1' dispatch={dispatch} />
            <DigitBtn digit='2' dispatch={dispatch} />
            <DigitBtn digit='3' dispatch={dispatch} />
            <OperationBtn operation='*' dispatch={dispatch} />
            <DigitBtn digit='4' dispatch={dispatch} />
            <DigitBtn digit='5' dispatch={dispatch} />
            <DigitBtn digit='6' dispatch={dispatch} />
            <OperationBtn operation='+' dispatch={dispatch} />
            <DigitBtn digit='7' dispatch={dispatch} />
            <DigitBtn digit='8' dispatch={dispatch} />
            <DigitBtn digit='9' dispatch={dispatch} />
            <OperationBtn operation='-' dispatch={dispatch} />
            <DigitBtn digit='.' dispatch={dispatch} />
            <DigitBtn digit='0' dispatch={dispatch} />
            <button className="span-two">=</button>
        </div>
    )
}

export default App