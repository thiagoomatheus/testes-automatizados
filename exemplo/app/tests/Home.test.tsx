import {describe, test} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../page';

describe("Primeiro teste", () => {
    test("Mensagem de Hello World aparece na página", () => {
        render(<Home />)
        
        screen.getByText("Hello World!")
    })
});