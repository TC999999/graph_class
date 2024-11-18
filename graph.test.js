const { Node, Graph } = require("./graph");

describe("Graph Class", function () {
  let g;
  let ross;
  let rachel;
  let monica;
  let chandler;
  let joey;
  let phoebe;
  let janice;
  let gunther;
  let richard;
  let emily;

  beforeAll(function () {
    ross = new Node("ross");
    rachel = new Node("rachel");
    monica = new Node("monica");
    chandler = new Node("chandler");
    joey = new Node("joey");
    phoebe = new Node("phoebe");
    janice = new Node("janice");
    gunther = new Node("gunther");
    richard = new Node("richard");
    emily = new Node("emily");

    g = new Graph();
    g.addVertex(ross);
    g.addVertex(rachel);
    g.addVertices([monica, chandler]);
    g.addVertices([joey, phoebe]);
    g.addEdge(ross, rachel);
    g.addEdge(ross, phoebe);
    g.addEdge(rachel, monica);
    g.addEdge(monica, chandler);
    g.addEdge(phoebe, joey);
    g.addEdge(joey, chandler);
  });

  test("adds a new vertex", function () {
    expect(g.vertices.has(janice)).toBe(false);
    g.addVertex(janice);
    expect(g.vertices.has(janice)).toBe(true);
  });

  test("adds multiple new vertices in an array", function () {
    expect(g.vertices.has(richard)).toBe(false);
    expect(g.vertices.has(gunther)).toBe(false);

    g.addVertices([gunther, richard]);
    expect(g.vertices.has(richard)).toBe(true);
    expect(g.vertices.has(gunther)).toBe(true);
  });

  test("graph can all find existing vertices through depth first search", function () {
    expect(g.depthFirstSearch(ross)).toEqual([
      "ross",
      "phoebe",
      "joey",
      "chandler",
      "monica",
      "rachel",
    ]);
  });

  test("graph can all find existing vertices through breadth first search", function () {
    expect(g.breadthFirstSearch(ross)).toEqual([
      "ross",
      "rachel",
      "phoebe",
      "monica",
      "joey",
      "chandler",
    ]);
  });

  test("graph can find existing relationships between vertices through depth first search, even if nodes are not adjacent", function () {
    expect(g.areConnectedDFS(ross, rachel)).toBe(true);
    expect(g.areConnectedDFS(joey, chandler)).toBe(true);
    expect(g.areConnectedDFS(phoebe, chandler)).toBe(true);
    expect(g.areConnectedDFS(chandler, janice)).toBe(false);
    expect(g.areConnectedDFS(rachel, gunther)).toBe(false);
    expect(g.areConnectedDFS(monica, richard)).toBe(false);
  });

  test("graph can find existing relationships between vertices through breadth first search, even if nodes are not adjacent", function () {
    expect(g.areConnectedBFS(ross, rachel)).toBe(true);
    expect(g.areConnectedBFS(joey, chandler)).toBe(true);
    expect(g.areConnectedBFS(phoebe, chandler)).toBe(true);
    expect(g.areConnectedBFS(chandler, janice)).toBe(false);
    expect(g.areConnectedBFS(rachel, gunther)).toBe(false);
    expect(g.areConnectedBFS(monica, richard)).toBe(false);
  });

  test("searching for a connection throws an error if either node does not exist on graph", function () {
    expect(() => g.areConnectedDFS(ross, emily)).toThrow(
      "Both nodes should be on the graph"
    );
    expect(() => g.areConnectedBFS(ross, emily)).toThrow(
      "Both nodes should be on the graph"
    );
  });

  test("adds connections between two vertices if both are in graph", function () {
    expect(g.areConnectedBFS(chandler, janice)).toBe(false);
    expect(chandler.adjacent.has(janice)).toBe(false);
    expect(g.areConnectedBFS(joey, janice)).toBe(false);
    expect(joey.adjacent.has(janice)).toBe(false);

    g.addEdge(chandler, janice);
    expect(g.areConnectedBFS(chandler, janice)).toBe(true);
    expect(chandler.adjacent.has(janice)).toBe(true);
    expect(g.areConnectedBFS(joey, janice)).toBe(true);
    expect(joey.adjacent.has(janice)).toBe(false);

    expect(g.areConnectedBFS(monica, richard)).toBe(false);
    expect(monica.adjacent.has(richard)).toBe(false);
    expect(g.areConnectedBFS(ross, richard)).toBe(false);
    expect(ross.adjacent.has(richard)).toBe(false);

    g.addEdge(monica, richard);
    expect(g.areConnectedBFS(monica, richard)).toBe(true);
    expect(monica.adjacent.has(richard)).toBe(true);
    expect(g.areConnectedBFS(ross, richard)).toBe(true);
    expect(ross.adjacent.has(richard)).toBe(false);

    expect(ross.adjacent.has(emily)).toBe(false);
    expect(g.addEdge(ross, emily)).toBe(false);
    expect(ross.adjacent.has(emily)).toBe(false);
  });

  test("removes connections between two vertices if both in graph", function () {
    expect(g.areConnectedBFS(chandler, janice)).toBe(true);
    expect(chandler.adjacent.has(janice)).toBe(true);
    expect(g.areConnectedBFS(joey, janice)).toBe(true);
    expect(joey.adjacent.has(janice)).toBe(false);

    g.removeEdge(chandler, janice);

    expect(g.areConnectedBFS(chandler, janice)).toBe(false);
    expect(chandler.adjacent.has(janice)).toBe(false);
    expect(g.areConnectedBFS(joey, janice)).toBe(false);
    expect(joey.adjacent.has(janice)).toBe(false);

    expect(g.removeEdge(ross, emily)).toBe(false);
  });

  test("removing a single vertex from the graph also removes the connections it had", function () {
    expect(g.vertices.has(richard)).toBe(true);

    expect(g.areConnectedBFS(monica, richard)).toBe(true);
    expect(monica.adjacent.has(richard)).toBe(true);
    expect(g.areConnectedBFS(ross, richard)).toBe(true);
    expect(ross.adjacent.has(richard)).toBe(false);

    g.removeVertex(richard);
    expect(g.vertices.has(richard)).toBe(false);
    expect(() => g.areConnectedBFS(monica, richard)).toThrow(
      "Both nodes should be on the graph"
    );
    expect(monica.adjacent.has(richard)).toBe(false);
    expect(() => g.areConnectedBFS(ross, richard)).toThrow(
      "Both nodes should be on the graph"
    );
    expect(ross.adjacent.has(richard)).toBe(false);
  });

  test("removing a node throws and error if the node is not in the graph", function () {
    expect(() => g.removeVertex(emily)).toThrow("node not in graph");
  });

  test("shortestPath() returns the shortest number of connections between two nodes on the graph", function () {
    expect(g.shortestPath(ross, rachel)).toEqual(1);
    expect(g.shortestPath(ross, monica)).toEqual(2);
    expect(g.shortestPath(ross, joey)).toEqual(2);
    expect(g.shortestPath(ross, chandler)).toEqual(3);

    g.addEdge(rachel, chandler);
    expect(g.shortestPath(ross, chandler)).toEqual(2);

    expect(g.shortestPath(janice, chandler)).toBe(false);
  });

  test("shortestPath throws an error if the graph does not have both nodes", function () {
    expect(() => g.shortestPath(ross, emily)).toThrow(
      "Both nodes should be on the graph"
    );
  });
});
