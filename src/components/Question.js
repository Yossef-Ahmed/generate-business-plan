import React from 'react';
import {
    FormControl,
    FormCheck
} from 'react-bootstrap';

export default function Question({title, options, inputType, answer, onChange}) {
    return (
        <div className="question">
            <div className="question__title">
                {title}
            </div>
            <div className="question__answer">
                {inputType === "radio" ? (
                    options.map(option => (
                        <FormCheck
                            inline
                            type="radio"
                            name={title}
                            label={option}
                            value={answer}
                            id={`${title}-${option}`}
                            key={`${title}-${option}`}
                            onChange={() => onChange(option, title)}
                        />
                    ))
                ) : (
                    <FormControl
                        type="number"
                        value={answer}
                        placeholder="Amount of investment"
                        onChange={e => onChange(parseInt(e.target.value), title)}
                    />
                )}
            </div>
        </div>
    )
}
