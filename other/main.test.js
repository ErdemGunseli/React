import {expect, test} from "vitest";
// Function must be exported from the relevant file to be exported here:
import {cumulativeSum, iterativeBinarySearch, LRU} from "./algorithms.js";


// First argument is a string that defines what we are trying to test:
test("cumulative sum of an array", () => {
    expect(cumulativeSum([1, 3, 5, 7])).toBe(16); // Similar to assert
    expect(cumulativeSum([1, 3, 5, 7, 9])).toBe(25);
    expect(cumulativeSum([1, 3, 5, 7, 9, 11])).toBe(36);
    expect(cumulativeSum([1, 3, 5, 7, 9, 11, 13])).toBe(49);
    expect(cumulativeSum([1, 3, 5, 7, 9, 11, 13, 15])).toBe(64);
    expect(cumulativeSum([1.5, 3.5, 5.5, 7.5, 9.5, 11.5, 13.5, 15.5])).toBe(68);
    expect(cumulativeSum([1.5, 3.5, 5.5, 7.5, 9.5, 11.5, 13.5])).toBe(52.5);
    expect(cumulativeSum([1.2, 3.2, 5.2, 7.2, 9.2, 11.2])).toBe(37.2);
    expect(cumulativeSum([-1, -3, -5, -7, -9, -11, -13, -15])).toBe(-64);
    expect(cumulativeSum([-1.5, -3.5, -5.5, -7.5, -9.5, -11.5, -13.5, -15.5])).toBe(-68);
});


test("iterative binary search", () => {
    expect(iterativeBinarySearch([1, 3, 5, 7], 1)).toBe(0);
    expect(iterativeBinarySearch([1, 3, 5, 7], 3)).toBe(1);
    expect(iterativeBinarySearch([1, 3, 5, 7], 5)).toBe(2);
    expect(iterativeBinarySearch([1, 3, 5, 7], 7)).toBe(3);
});

test("least recently used cache", () => {
    let cache = new LRU(5); 
    cache.putItem("a", 1);
    cache.putItem("b", 2);
    cache.putItem("c", 3);
    cache.putItem("d", 4);
    cache.putItem("e", 5);
    expect(cache.getItem("a")).toBe(1);
    cache.putItem("f", 6);
    expect(cache.getItem("b")).toBe(null);
});

// Don't run the test using Node.js; run it from the terminal using
// npm