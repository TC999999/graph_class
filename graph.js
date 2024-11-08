class Node {
  constructor(val, adjacent = new Set()) {
    this.val = val;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.vertices = new Set();
  }

  addVertex(vertex) {
    this.vertices.add(vertex);
  }

  addVertices(vertexArr) {
    for (let v of vertexArr) {
      this.vertices.add(v);
    }
  }

  addEdge(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      node1.adjacent.add(node2);
      node2.adjacent.add(node1);
    } else {
      return false;
    }
  }

  removeEdge(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      if (node2.adjacent.has(node1) && node1.adjacent.has(node2)) {
        node1.adjacent.delete(node2);
        node2.adjacent.delete(node1);
      }
    } else {
      return false;
    }
  }

  removeVertex(node) {
    if (this.vertices.has(node)) {
      this.vertices.delete(node);
      for (let v of this.vertices) {
        if (v.adjacent.has(node)) {
          v.adjacent.delete(node);
        }
      }
    }
  }

  depthFirstSearch(node) {
    if (this.vertices.has(node)) {
      let check = new Set();
      let stack = [node];
      let final = [];
      while (stack.length) {
        let currentNode = stack.pop();
        console.log(currentNode);

        for (let a of currentNode.adjacent) {
          if (!check.has(a.val)) {
            stack.push(a);
            check.add(a.val);
          }
        }

        final.push(currentNode.val);
        check.add(currentNode.val);
      }
      return final;
    }
  }

  breadthFirstSearch(node) {
    if (this.vertices.has(node)) {
      let check = new Set([node]);
      let queue = [node];
      let final = [];
      while (queue.length) {
        let currentNode = queue.shift();
        console.log(currentNode);

        for (let a of currentNode.adjacent) {
          if (!check.has(a.val)) {
            queue.push(a);
            check.add(a.val);
          }
        }

        final.push(currentNode.val);
      }
      return final;
    }
  }

  areConnectedBFS(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      let toVisitQueue = [node1];
      let seen = new Set(toVisitQueue);
      while (toVisitQueue.length) {
        let currentNode = toVisitQueue.shift();
        console.log("visiting ", currentNode.val);

        if (currentNode === node2) return true;

        for (let a of currentNode.adjacent) {
          if (!seen.has(a)) {
            toVisitQueue.push(a);
            seen.add(a);
          }
        }
      }
      return false;
    } else {
      throw new Error("Both nodes should be on the tree.");
    }
  }

  areConnectedDFS(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      let toVisitStack = [node1];
      let seen = new Set(toVisitStack);
      while (toVisitStack.length) {
        let currentNode = toVisitStack.pop();
        console.log("visiting ", currentNode.val);

        if (currentNode === node2) return true;

        for (let a of currentNode.adjacent) {
          if (!seen.has(a)) {
            toVisitStack.push(a);
            seen.add(a);
          }
        }
      }
      return false;
    } else {
      throw new Error("Both nodes should be on the tree.");
    }
  }

  shortestPath(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      let stack = [node1];
      let length = 0;
      let check = new Set([node1.val]);
      while (stack.length) {
        let levelArr = [];
        for (let n of stack) {
          if (n.val !== node2.val) {
            for (let a of n.adjacent) {
              if (!check.has(a.val)) {
                check.add(a.val);
                levelArr.push(a);
              }
            }
          } else {
            return length;
          }
        }
        stack = levelArr;
        length++;
      }
      return false;
    } else {
      throw new Error("Both nodes should be on the tree.");
    }
  }
}

let ross = new Node("ross");
let rachel = new Node("rachel");
let monica = new Node("monica");
let chandler = new Node("chandler");
let joey = new Node("joey");
let phoebe = new Node("phoebe");
let janice = new Node("janice");
let gunther = new Node("gunther");
let g = new Graph();
g.addVertex(ross);
g.addVertex(rachel);
g.addVertices([monica, chandler]);
g.addVertices([joey, phoebe]);
g.addEdge(ross, rachel);
g.addEdge(ross, phoebe);
g.addEdge(rachel, monica);
g.addEdge(rachel, joey);
g.addEdge(monica, phoebe);
g.addEdge(monica, chandler);
g.addEdge(phoebe, joey);
g.addEdge(joey, chandler);
g.addEdge(chandler, ross);

let graph = new Graph();
let S = new Node("S");
let P = new Node("P");
let U = new Node("U");
let X = new Node("X");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");
let Z = new Node("Z");
let A = new Node("A");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T, Z]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);
