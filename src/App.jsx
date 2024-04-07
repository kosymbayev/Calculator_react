import { useReducer } from 'react'

import DigitBtn from '@/components/DigitBtn'
import OperationBtn from '@/components/OperationBtn'

import ACTIONS from '@/ACTIONS'

import '@/assets/css/style.css'

function reducer(state, { type, payload })
{
    switch( type )
    {
        // Добавление символа
        case ACTIONS.ADD_DIGIT:
            if( state.overwrite )
            {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            if( payload.digit === '0' && state.currentOperand === '0' ) return state;// Не добавляю 0 к 0
            if( payload.digit === '.' && state.currentOperand.includes('.') ) return state;// Не добавляю . если есть .
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }

        // Добавление операции
        case ACTIONS.CHOOSE_OPERATION:
            if( state.currentOperand == null && state.previousOperand == null){ return state }// Если ничего нет

            if( state.currentOperand == null )// Замена операции
            {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            if( state.previousOperand == null )
            {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }

        // Очищение
        case ACTIONS.CLEAR:
            return {}

        // Удалить последнию цифру
        case ACTIONS.DELETE_DIGIT:
            if( state.overwrite )
            {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }

            if( state.currentOperand == null ){ return { state } }
            if( state.currentOperand.length === 1 )
            {
                return {
                    ...state,
                    currentOperand: null
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        
        case ACTIONS.EVALUATE:
            if(
                state.operation == null
                ||
                state.currentOperand == null
                ||
                state.previousOperand == null
            )
            {
                return state
            }
            
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }
    }
}

// Вычисление
function evaluate({ currentOperand, previousOperand, operation })
{
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if( isNaN(prev) || isNaN(current) ){ return '' }
    
    let computation = ''
    switch( operation )
    {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
    }

    return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat( 'en-us', {
    maximumFractionDigits: 0
})
function formatOperand(operand)
{
    if( operand == null ){ return }
    const [integer, decimal] = operand.split('.')
    if( decimal == null ){ return INTEGER_FORMATTER.format(integer) }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App()
{
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{ formatOperand(previousOperand) } { operation }</div>
                <div className="current-operand">{ formatOperand(currentOperand) }</div>
            </div>
            <button 
                className="span-two" 
                onClick={ () => dispatch({ type: ACTIONS.CLEAR }) }
            >
                AC
            </button>
            <button onClick={ () => dispatch({ type: ACTIONS.DELETE_DIGIT }) } >
                DEL
            </button>
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
            <button 
                className="span-two"
                onClick={ () => dispatch({ type: ACTIONS.EVALUATE }) }
            >
                =
            </button>
        </div>
    )
}

export default App