const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {

        //create a new item object, place data in
        let newNode = new Node(data);


        //special case: no items in the list yet
        if (this.length == 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {

            //attach to the tail node
            newNode.prev = this._tail;
            this._tail.next = newNode;
            this._tail = newNode;
        }

        //don't forget to update the count
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        if (index < 0 || this.length <= index) {
            return null;
        }

        let current = this._head;
        let currentIndex = 0;

        while (currentIndex < index) {
            current = current.next;
            currentIndex++;
        }

        return current.data;
    }

    insertAt(index, data) {
        if (index < 0 || this.length < index) {
            return false;
        }
        let node = new Node(data);
        if (index === 0) {
            node.next = this._head;
            this._head.prev = node;

            this._head = node;
        } else if (index === this.length) {
            this._tail.next = node;
            node.prev = this._tail;

            this._tail = node;
        } else {
            let current = this._head;
            let prev = null;
            let currentIndex = 0;

            while (currentIndex < index) {
                prev = current;
                current = current.next;
                currentIndex++;
            }

            prev.next = node;
            node.prev = prev;

            node.next = current;
            current.prev = node;
        }
        this.length++;
    }

    isEmpty() {
        return !this.length ? true : false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    deleteAt(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let current;
        if (index === 0) {
            current = this._head;
            this._head = this._head.next;
            this._head.prev = null;
        } else if (index === this.length - 1) {
            current = this._tail;
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            current = this._head;
            let prev = null;
            let currentIndex = 0;

            while (currentIndex < index) {
                prev = current;
                current = current.next;
                currentIndex++;
            }
            prev.next = current.next;
            current.next.prev = prev;
        }
        this.length--;
        return this;
    }

    reverse() {

        let temp = null;
        let current = this._head;

        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        this._tail = this._head;
        if (temp) {
            this._head = temp.prev;
        }
        return this;
    }


    indexOf(data) {

        let current = this._head;
        let index = 0;

        while (index < this.length) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }
}

module.exports = LinkedList;