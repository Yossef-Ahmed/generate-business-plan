import React, { useState, useEffect } from 'react';
import {
    Button,
    Container
} from 'react-bootstrap';
import QuestionBox from "../components/QuestionBox";
import ResultsBox from '../components/ResultsBox';
import { usePrevious } from "../utils";
import { useNavigate } from "react-router-dom";

export default function QuestionnairePage() {
    const [steps, setSteps] = useState({
        "Step 1": [
            {
                title: "Is your business model B2C or B2B or both?",
                answer: "",
                inputType: "radio",
                options: ["B2C", "B2B", "both"],
                show: true,
            },
            {
                title: "Do you target all age brackets?",
                answer: "",
                inputType: "radio",
                options: ["yes", "no"],
                show: false,
            },
            {
                title: "Do you target all industries?",
                answer: "",
                inputType: "radio",
                options: ["yes", "no"],
                show: false,
            },
        ],
        "Step 2": [
            {
                title: "Did you have an investment?",
                answer: "",
                inputType: "radio",
                options: ["yes", "no"],
                show: true,
            },
            {
                title: "how much was the investment?",
                answer: 0,
                inputType: "number",
                show: false,
            },
        ]
    })
    const [currentStep, setcurrentStep] = useState(1)
    const prevStepOneQuestionOne = usePrevious(steps["Step 1"][0].answer);
    const prevStepTwoQuestionOne = usePrevious(steps["Step 2"][0].answer);

    // To show different questions from Step 1 dpending on the 1st question answer
    useEffect(() => {
        if (prevStepOneQuestionOne !== undefined) {
            const stepOne = steps["Step 1"];
            const QuestionOneAnswer = stepOne[0].answer;
            
            if (prevStepOneQuestionOne !== QuestionOneAnswer) {
                if (QuestionOneAnswer === "B2C") {
                    stepOne[1].show = false;
                    stepOne[2].show = true;
                } else if (QuestionOneAnswer === "B2B") {
                    stepOne[1].show = true;
                    stepOne[2].show = false;
                } else if (QuestionOneAnswer === "both") {
                    stepOne[1].show = true;
                    stepOne[2].show = true;
                } else {
                    stepOne[1].show = false;
                    stepOne[2].show = false;
                }
    
                setSteps(prev => ({
                    ...prev,
                    "Step 1": stepOne
                }))
            }
        }
    }, [setSteps, steps, prevStepOneQuestionOne])

    // To show different questions from Step 2 dpending on the 1st question answer
    useEffect(() => {
        if (prevStepTwoQuestionOne !== undefined) {
            const stepTwo = steps["Step 2"];
            const QuestionTwoAnswer = stepTwo[0].answer;
            
            if (prevStepTwoQuestionOne !== QuestionTwoAnswer) {
                if (QuestionTwoAnswer === true) {
                    stepTwo[1].show = true;
                } else if (QuestionTwoAnswer === false) {
                    stepTwo[1].show = false;
                } else {
                    stepTwo[1].show = false;
                }
    
                setSteps(prev => ({
                    ...prev,
                    "Step 2": stepTwo
                }))
            }
        }
    }, [setSteps, steps, prevStepTwoQuestionOne])

    let navigate = useNavigate();

    const nextAndSubmit = () => {
        if (currentStep < 3) {
            if (AreStepQuestionsAnswered()) {
                setcurrentStep(currentStep + 1)
            }
        } else {
            navigate("/congrats")
        }
    }

    const AreStepQuestionsAnswered = () => {
        const questions = steps[`Step ${currentStep}`].filter(question => question.show === true);
        const unansweredQuestions = questions.filter(question => question.answer === '');
        return unansweredQuestions.length === 0 ? true : false;
    }

    const updateAnswers = (newAnswer, questionTitle) => {
        let answer = newAnswer;
        answer = answer === 'yes' ? true : answer === 'no' ? false : answer;

        const currStep = steps[`Step ${currentStep}`];
        currStep.find(question => questionTitle === question.title).answer = answer;

        setSteps({
            ...steps,
            [`Step ${currentStep}`]: currStep
        })
    }

    return (
        <div className="questions-page">
            <Container className="text-center">
                <h1 className="main-title">Step {currentStep}</h1>

                {currentStep !== 3 ? (
                    <QuestionBox questions={steps[`Step ${currentStep}`]} updateAnswers={updateAnswers} />
                ) : (
                    <ResultsBox steps={steps} />
                )}

                <div className="next-btn-container">
                    <Button variant="primary" className="next-btn" onClick={() => nextAndSubmit()}>
                        {currentStep !== 3 ? "Next" : "Submit"}
                    </Button>
                </div>
            </Container>
        </div>
    )
}