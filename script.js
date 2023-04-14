const testArray = [];

for (let i = 1; i < 32; i++) {
    testArray.push(i);
}

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const cleaned = removeDupes(mergeSort(array));
        this.root = this.buildTree(cleaned, 0, cleaned.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        return new Node(array[mid], this.buildTree(array, start, mid - 1), this.buildTree(array, mid + 1, end));
    }

    insert(value, node = this.root) {
        if (node.data === value) return;
        if (node.data > value && node.left === null) return node.left = new Node(value);
        if (node.data < value && node.right === null) return node.right = new Node(value);
        if (node.data > value && node.left !== null) this.insert(value, node.left);
        if (node.data < value && node.right !== null) this.insert(value, node.right);
    }

    delete(value, node = this.root) {
        if (node.data > value) node.left = this.delete(value, node.left);
        else if (node.data < value) node.right = this.delete(value, node.right);
        else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                let min = node.right;
                while (min.left !== null) min = min.left;
                node.data = min.data;
                node.right = this.delete(min.data, node.right);
            }
        }
        return node;
    }

    find(value, node = this.root) {
        if (node === null) return null;
        if (node.data === value) return node;
        if (node.data > value) return this.find(value, node.left);
        if (node.data < value) return this.find(value, node.right);
    }

    noCallback(cb) {
        let arr = [];
        cb.call(this, (data) => arr.push(data));
        return (arr);
    }

    levelOrder(cb, node = this.root) {
        if (!cb) return this.noCallback(this.levelOrder);
        let queue = [node];
        let index = 0;
        while (index < queue.length) {
            cb(queue[index].data);
            if (queue[index].left !== null) queue.push(queue[index].left);
            if (queue[index].right !== null) queue.push(queue[index].right);
            index ++;
        }
    }

    preOrder(cb, node = this.root) {
        if (!cb) return this.noCallback(this.preOrder);
        cb(node.data);
        if (node.left !== null) this.preOrder(cb, node.left);
        if (node.right !== null) this.preOrder(cb, node.right);
    }

    inOrder(cb, node = this.root) {
        if (!cb) return this.noCallback(this.inOrder);
        if (node.left !== null) this.inOrder(cb, node.left);
        cb(node.data);
        if (node.right !== null) this.inOrder(cb, node.right);
    }

    postOrder(cb, node = this.root) {
        if (!cb) return this.noCallback(this.postOrder);
        if (node.left !== null) this.postOrder(cb, node.left);
        if (node.right !== null) this.postOrder(cb, node.right);
        cb(node.data);
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