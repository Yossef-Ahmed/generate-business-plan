import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="centered-container">
            <Container className="text-center" fluid>
                <h1 className="main-title">Let Us Help You Make Your Business Grow</h1>
                <Link to="/questions">
                    <Button variant="primary">Generate Business Plan</Button>
                </Link>
            </Container>
        </div>
    )
}
