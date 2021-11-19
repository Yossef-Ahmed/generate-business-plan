import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ResultsBox({steps}) {
    return (
        <div className="results">
            {Object.keys(steps).map(key => (
                <Card className="text-start" key={key}>
                    <Card.Header>{`Review ${key} Answers`}</Card.Header>
                    <Card.Body>
                        <div className="questions">
                            {steps[key].filter(question => question.show === true).map((question, index) => (
                                <div className="question" key={index}>
                                    <div className="question__title">
                                        {question.title}
                                    </div>
                                    <div className="question__answer">
                                        <span className="answer-text">
                                            {question.answer === true ? "yes" : question.answer === false ? "no" : question.answer}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}
