import { describe, expect, test } from '@jest/globals'
import sum from './sum'

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
//FUCK JEST use RTL

// Example looks easy enough to replicate anyway

// https://testing-library.com/docs/react-testing-library/example-intro
