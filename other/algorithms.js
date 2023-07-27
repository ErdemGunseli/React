export function cumulativeSum(items) {
    let total = 0;

    for (let item of items) {
        total += item;
    }

    return total;
}

export function iterativeBinarySearch(items, target) {
    let midpoint;
    let start = 0;
    let end = items.length - 1;

    while (start <= end) {
        midpoint = Math.floor((start + end) / 2);

        if (target < items[midpoint]) {end = midpoint - 1}
        else if (items[midpoint] < target) {start = midpoint + 1;}
        else {return midpoint}
    }
    return -1;
}

// An LRU Cache (Least Recently Used Cache) is a data structure that removes the 
// least recently used item when it is full and a new item needs to be added.
export class LRU {
    constructor(maxSize) {
        this.maxSize = maxSize;

        // Most recently used item at the end, least recently used item at the start:
        this.items = [];
    }

    getItem(key) {
        for (let [index, item] of this.items.entries()) {
            // Linear searching:
            if (item[0] == key) {
                // Placing the item at the end of the array:
                // Splice returns a new array that starts at the specified index of the old array. 
                // The second argument specifies the number of elements to copy from the old array.
                // Since it returns an array, we need to access the first element, and push that.
                this.items.push(this.items.splice(index, 1)[0]);
                return item[1];
            }
        }
        return null;
    }

    putItem(key, value) {
        // Removing the least recently used item:
        if (this.items.length == this.maxSize) {
            this.items.shift() // Removes the first value
        }
        // Removing any item existing item with this key:
        for (let [index, item] of this.items.entries()) {
            // Linear searching:
            if (item[0] == key) {this.items.splice(index, 1)[0];}
        }
        this.items.push([key, value])
    }
}




// FireShip Solution:
class LeastRecentlyUsed {
    constructor(capacity) {
        this.capacity = capacity;
        // A map is like a Python dictionary:
        this.cache = new Map();
    }

    getItem(key) {
        // Finding the value from the map:
        const value = this.cache.get(key);

        // Deleting and re-inserting the item so it is at the end of the map:
        this.cache.delete(key);
        this.cache.set(key, value);
    }

    putItem(key) {
        // Using the has method of maps makes the process very quick:
        if (this.cache.has(key)) {
            this.cache.delete(key);
        // If an item has just been deleted, we know that the cache is not full, so can use else if:
        } else if (this.cache.size == this.capacity) {this.cache.delete(this.oldestKey);}

        this.cache.set(key, val)
    }
    

    // The 'get' keyword is not necessary, but allows us to call this as a property instead of a function:
    // i.e. we can access the oldest item as if it was a property
    // Since we have the 'get' keyword, we can use this.oldestKey instead of this.oldestKey()
    get oldestKey() {
        // map.keys() returns a new iterator object that contains the keys for each element in the map in order of their insertion.
        // map.key().next() returns the next iterator result which has 2 properties: value and done.
        // So the following line gets the first key from the map (i.e. the least recently inserted key):
        return this.cache.keys().next().value
    }
}


// Testing using vitest:
/* 
    npm init -y
    npm install -D vitest
*/

