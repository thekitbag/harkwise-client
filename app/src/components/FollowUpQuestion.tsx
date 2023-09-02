import React from 'react'

interface FollowUpQuestionProps {
    followUpQuestion: string;
}


const FollowUpQuestion: React.FC<FollowUpQuestionProps> = ({followUpQuestion}) => {
    return <h1>{followUpQuestion}</h1>
}

export default FollowUpQuestion