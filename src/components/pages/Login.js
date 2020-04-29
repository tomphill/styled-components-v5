import React, {useState, useEffect} from 'react';
import {PageLayout, Input, PasswordInput, Button, Spinner} from 'components/common';
import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    max-width: 400px;
    background: white;
    border: 1px solid #eee;
    padding: 16px;
    box-sizing: border-box;
    color: black;
    border-radius: 4px;

    .alt-text{
        text-align: center;
        margin: 10px 0;
    }

    >${Button}:first-of-type{
        margin-top: 40px;
    }

    >${Input}{
        margin-top: 20px;
    }
`;

let timeout;

export default function Login(){
    const [formFields, setFormFields] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);

    function handleInputChange(e){
        e.persist();
        setFormFields(s => ({
            ...s,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        return ()=> {
            if(timeout){
                clearTimeout(timeout);
            }
        }
    }, []);

    return (
        <PageLayout>
            <h1>
                Login
            </h1>
            <Form onSubmit={handleSubmit}>
                {loading ? <Spinner /> : 
                <>
                <span>
                    Login if you have an account
                </span>
                <Input 
                    value={formFields.username}
                    onChange={handleInputChange}
                    name="username" 
                    type="text"
                    placeholder="Username" />
                <PasswordInput 
                    value={formFields.password}
                    onChange={handleInputChange}
                    name="password" />
                </>
                }
                <Button large type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
                {!loading &&
                <>
                <div className="alt-text">
                    or
                </div>
                <Button secondary type="button">
                    Register
                </Button>
                </>
                }
            </Form>
        </PageLayout>
    )
}