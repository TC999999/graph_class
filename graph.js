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
      let adj = node.adjacent;
      for (let a of adj) {
        this.removeEdge(node, a);
      }

      this.vertices.delete(node);
    } else {
      throw new Error("node not in graph");
    }
  }

  depthFirstSearch(node) {
    if (this.vertices.has(node)) {
      let check = new Set([node.val]);
      let stack = [node];
      let final = [];
      while (stack.length) {
        let currentNode = stack.pop();

        for (let a of currentNode.adjacent) {
          if (!check.has(a.val)) {
            stack.push(a);
            check.add(a.val);
          }
        }

        final.push(currentNode.val);
      }
      return final;
    }
  }

  breadthFirstSearch(node) {
    if (this.vertices.has(node)) {
      let check = new Set([node.val]);
      let queue = [node];
      let final = [];
      while (queue.length) {
        let currentNode = queue.shift();
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
      throw new Error("Both nodes should be on the graph");
    }
  }

  areConnectedDFS(node1, node2) {
    if (this.vertices.has(node1) && this.vertices.has(node2)) {
      let toVisitStack = [node1];
      let seen = new Set(toVisitStack);
      while (toVisitStack.length) {
        let currentNode = toVisitStack.pop();

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
      throw new Error("Both nodes should be on the graph");
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
      throw new Error("Both nodes should be on the graph");
    }
  }
}

module.exports = { Node, Graph };
