import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

interface ITaskList {
    taskName: string,
    id: string,
    onDelete(id: string): void,
    onSave(id: string, newTaskName: string): void,
    onCompleted(id: string, state: boolean): void,
}

const Task: React.FC<ITaskList> = (props) => {

    const [taskActionVis, setTaskActionVis] = useState(false);
    const [taskEditVis, setTaskEditVis] = useState(false);
    const [taskName, setTaskName] = useState<string>(props.taskName)

    const handleDivClick = () => {
        const docRef = document.getElementById(props.id);
        docRef?.classList.toggle('line-through');
        document.getElementById('div'+props.id)?.classList.toggle('bg-red-100/20');
        if(docRef?.classList.contains('line-through')) props.onCompleted(props.id, true);
        else props.onCompleted(props.id, false);
    }
    const handleDelete = (): void => {
        props.onDelete(props.id)
    }

    const handleEdit = () => {
        setTaskEditVis(true);
    }

    const handleSave = () => {
        setTaskEditVis(false);
        props.onSave(props.id, taskName);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleSave();
    }

    return (
        <>
            <div id={'div'+props.id} className="relative bg-sky-600 rounded-md mb-1  hover:bg-sky-700" onMouseOver={() => setTaskActionVis(true)} onMouseOut={() => setTaskActionVis(false)}>
                {taskEditVis ? (
                    <>
                        <input id={'input'+props.id} onChange={handleInputChange} onClick={handleDivClick} onKeyDown={handleKeyDown} className="inline text-black bg-slate-300 rounded-md pl-2 w-[100%] focus:outline-none border-0" value={taskName} />
                        <CheckIcon onClick={handleSave} titleAccess='Save task' className="inline absolute text-black right-1 hover:cursor-pointer p-1 hover:bg-slate-300/20 hover:rounded-xl" />

                    </>
                ) : (
                    <>
                        <h1 onClick={handleDivClick} title='Complete task' id={props.id} className="inline  px-2 hover:cursor-pointer" >{taskName}</h1>
                        {taskActionVis ? (
                            <>
                                <EditIcon onClick={handleEdit} titleAccess='Edit task' className="inline absolute right-5 hover:cursor-pointer p-1 hover:bg-slate-300/20 hover:rounded-xl" />
                                <DeleteIcon onClick={handleDelete} titleAccess='Delete task' className="inline absolute right-0 hover:cursor pointer p-1 hover:bg-slate-300/20 hover:rounded-xl" />
                            </>) : (
                            <></>
                        )}
                    </>
                )}



            </div>
        </>
    );
}

export default Task;