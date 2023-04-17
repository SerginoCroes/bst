class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const cleaned = removeDupes(array.sort((a, b) => a - b));
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
        return this.find(value, node.data > value ? node.left : node.right);
    }

    noCallback(cb) {
        let arr = [];
        cb.call(this, (data) => arr.push(data));
        return (arr);
    }

    levelOrder(cb) {
        if (!cb) return this.noCallback(this.levelOrder);
        let queue = [this.root];
        for (let i = 0; i < queue.length; i++) {
            cb(queue[i].data);
            if (queue[i].left !== null) queue.push(queue[i].left);
            if (queue[i].right !== null) queue.push(queue[i].right);
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

    height(node = this.root) {
        if (node === null) return -1;
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(value, node = this.root, depth = 0) {
        if (node === null) return null;
        if (node.data === value) return depth;
        return this.depth(value, node.data > value ? node.left : node.right, depth + 1);
    }

    isBalanced(node = this.root) {
        if (node === null) return true;
        const dif = Math.abs(this.height(node.left) - this.height(node.right)) <= 1;
        return dif && this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    reBalance() {
        const arr = this.inOrder();
        this.root = this.buildTree(arr, 0, arr.length - 1);
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

function removeDupes(arr) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i - 1] === arr[i]) arr.splice(i, 1);
        else i++;
    }
    return arr;
}

function test() {
    const testArray = [];
    for (let i = 0; i < 30; i++) testArray.push(Math.floor(Math.random() * 100));
    const tree = new Tree(testArray);
    prettyPrint(tree.root);
    console.log('balanced: ', tree.isBalanced());
    console.table([tree.levelOrder(), tree.preOrder(), tree.inOrder(), tree.postOrder()]);
    for (let i = 0; i < 10; i++) tree.insert(testArray[Math.floor(Math.random() * 30)] + 100);
    prettyPrint(tree.root);
    console.log('balanced: ', tree.isBalanced());
    tree.reBalance();
    prettyPrint(tree.root);
    console.log('balanced: ', tree.isBalanced());
    console.table([tree.levelOrder(), tree.preOrder(), tree.inOrder(), tree.postOrder()]);
}