import ReactLoading from 'react-loading'

function Loading() {
    return (
        <div className='loading'>
            <ReactLoading type='spin' color='74CD97' />
            <h3>Loading...</h3>
        </div>
    )
}

export default Loading
