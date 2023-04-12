const testArray = [];

for (let i = 1; i < 32; i++) {
    testArray.push(i);
}

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const sorted = removeDupes(mergeSort(array));
        this.root = this.buildTree(sorted, 0, sorted.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        return new Node(array[mid], this.buildTree(array, start, mid - 1), this.buildTree(array, mid + 1, end));
    }


}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function mergeSort([...arr]) {
    if (arr.length === 1) return arr;
    const half = Math.floor(arr.length / 2);
    const left = arr.splice(0, half);
    const right = arr;
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let arr = [];
    const length = left.length + right.length;
    for (let i = 0; i < length; i++) {
        if (left.length < 1) {
            arr = [...arr, ...right];
            break;
        }
        if (right.length < 1) {
            arr = [...arr, ...left];
            break;
        }
        arr.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    return arr;
}

function removeDupes(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] === arr[i]) arr.splice(i, 1);
    }
    return arr;
}

//function insert(item, )