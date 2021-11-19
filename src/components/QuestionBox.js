import React from 'react';
import Card from 'react-bootstrap/Card';
import Question from "./Question";

export default function QuestionBox({questions, updateAnswers}) {
    const filteredQuestions = questions.filter(question => question.show === true)

    return (
        <Card className="text-start">
            <Card.Header>Answer The Following Questions</Card.Header>
            <Card.Body>
                <div className="questions">
                    {filteredQuestions.map((question, index) => (
                        <Question
                            key={index}
                            title={question.title}
                            options={question.options}
                            inputType={question.inputType}
                            answer={question.answer}
                            onChange={updateAnswers}
                        />
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}
