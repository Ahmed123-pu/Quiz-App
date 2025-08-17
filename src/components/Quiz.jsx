import React, { useRef } from 'react'
import { data } from '../assets/data';

export default function Quiz() {
    let [index, setIndex] = React.useState(0);
    let [questision, setQuestision] = React.useState(data[index]);
    let [lock, setLock] = React.useState(false);
    let [score,setscore]= React.useState(0);
    let [result, setResult] = React.useState(false);
    let option1=useRef(null);
    let option2=useRef(null);
    let option3=useRef(null);
    let option4=useRef(null);
    
    let option_array=[option1,option2,option3,option4];

    const checkAns=(e,ans)=>{
        if(lock===false){
        if(questision.ans===ans){
            e.target.classList.add('correct');
            setLock(true);
            setscore(score+1);
        }else{
            e.target.classList.add('wrong');
            setLock(true);
            option_array[questision.ans-1].current.classList.add('correct');
        }
}
    }
    const next=()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestision(data[index]);
            setLock(false);
            option_array.forEach((option)=>{option.current.classList.remove('correct','wrong')});
        }
    }
  return (
    <div className='container'>
        <h1>Quiz Component</h1>
        <hr/>
        {result?<></>:<>
            <h2>{index+1} . {questision.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{questision.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{questision.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{questision.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{questision.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} of {data.length} questision</div>
        </>}
        {result?<>
            <h2>Your Score: {score} out of {data.length}</h2>
            <button onClick={()=>{setIndex(0); setQuestision(data[0]); setLock(false); setscore(0); setResult(false)}}>Restart</button>
        </>:<></>}
    </div>
  )
}
