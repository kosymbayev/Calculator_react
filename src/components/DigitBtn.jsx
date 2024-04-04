import ACTIONS from '@/ACTIONS'

export default function DigitBtn({ dispatch, digit })
{
    return (
        <button 
            onClick={ () => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } }) }
        >
            {digit}
        </button>
    )
}