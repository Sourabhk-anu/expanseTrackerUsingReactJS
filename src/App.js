import {useState, useEffect} from 'react'
import Task from './Task'

export default function App() {

  const [title, setTitle]= useState('')
  const [amount, setAmount]= useState('')
  const [tasks, setTasks]= useState([])

  const onSubmit = e => {
    e.preventDefault()
    if(title !== '') {
      const newTask= {id:Math.random(36).toString(), title, amount: parseFloat(amount)}
      console.log(newTask)
      setTasks([...tasks, newTask ])
      setTitle('')
      setAmount('')
      saveTasks()
    } else alert('Please enter some text and amount...')
  }

  const amounts = tasks.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1);

    const balance = income - expense;

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
    saveTasks()
  }

  const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks))

  useEffect(() => {
    const tempTasks = JSON.parse(localStorage.getItem('tasks'))
    if(tempTasks) setTasks(tempTasks)
  }, [])

  return (
      <div className="container">
        <main>
        <h1><b>Expense Tracker</b></h1>
        <h2>Your Balance</h2>
        <p className="balance">{balance}</p>
        <div>
          <h4 className="money">Income</h4>
          <p className="money plus">{income}</p>

          <h4 className="money">Expense</h4>
          <p className="money minus">{expense}</p>
        </div>

        <h3><ins>Add new Transaction</ins></h3>

        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Text..." value={title} onChange={e => setTitle(e.target.value)}/>
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)}/>
          <button type="submit" ><b>Add Transaction</b></button>
        </form>
        <h2><u>History</u></h2>

        <div className="taskContainer">
          { tasks.map(task => <Task task={task} deleteTask={deleteTask} key={task.id}/>)}
        </div>
        </main>
    </div>
  );
}

