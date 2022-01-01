const Task = ({task, deleteTask}) => {

    const{id, title, amount}= task

    const sign = amount < 0 ? '-' : '+';

    return (
        <div className={`task`}>
            <span onClick={() => deleteTask(id)}><i className="fa fa-times"></i></span>
            <h2 className={amount < 0 ? 'minus' : 'plus'}>{title}   {sign}${Math.abs(amount)}</h2>
        </div>
    )
}

export default Task
