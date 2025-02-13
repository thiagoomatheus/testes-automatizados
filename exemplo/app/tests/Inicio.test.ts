import {describe, expect, test} from '@jest/globals';
import { somar } from '../lib/somar';

describe("Primeiro teste", () => {
    test("Somar corretamente", () => {
        expect(somar(4, 4)).toBe(8)
    })
});