import React, { useEffect, useState } from 'react'

function tes() {
  const [count, setCount] = useState(0)
  const [doubled, setDoubled] = useState(0)

  const someVar = {
    name: 'Ahnaf',
    age: 12
  }
  useEffect(() => {
    setDoubled(2 * count)
  }, [count])
  
  useEffect(() => {
    console.log('aaaaaaa')
  
  }, [someVar])
  

  return (
    <div className='bg-white text-black h-screen'>
      <div className='flex gap-2'>
        <div>{count}</div>
        <div>{doubled}</div>
        <button onClick={() => setCount(prev => prev + 1)} className='px-3 py-1 bg-red-400 rounded'>+</button>
        <button className='px-3 py-1 bg-red-400 rounded'>-</button>
      </div>
    </div>

  )
}

export default tes