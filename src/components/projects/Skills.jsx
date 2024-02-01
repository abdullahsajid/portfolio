import React from 'react'

const Skills = ({skill}) => {
  
  return (
    <>
        <div className='flex flex-wrap gap-2 mt-3'>
            {skill.map((skills,i) => (
                <div key={i} className='skills text-[#8e8e8e] px-3 py-1 text-sm max-sm:text-xs rounded'>{skills}</div>
            ))}
        </div>
    </>
  )
}

export default Skills
