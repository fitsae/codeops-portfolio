from collections import deque
import heapq


# ==========================================
# 1. Binary Search Tree
# ==========================================

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(node):
    if node:
        inorder(node.left)
        print(node.value, end=" ")
        inorder(node.right)


balances = [450, 200, 800, 150, 300, 700, 900]

root = None
for balance in balances:
    root = insert(root, balance)

print("1. BST In-order Traversal (sorted):")
inorder(root)
print("\n")


# ==========================================
# 2. Tree Depth
# ==========================================

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


print("2. Tree Height:")
print(height(root))
print()


# ==========================================
# 3. Graph BFS
# ==========================================

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
}


def bfs(graph, start):
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()

        if vertex not in visited:
            visited.add(vertex)

            for neighbour in graph[vertex]:
                if neighbour not in visited:
                    queue.append(neighbour)

    return visited


print("3. BFS Reachable Vertices:")
print(bfs(graph, "A"))
print()


# ==========================================
# 4. Graph DFS
# ==========================================

def dfs(graph, start, visited=None):
    if visited is None:
        visited = []

    visited.append(start)

    for neighbour in graph[start]:
        if neighbour not in visited:
            dfs(graph, neighbour, visited)

    return visited


print("4. DFS Visit Order:")
print(dfs(graph, "A"))

print("BFS Visit Order:")


def bfs_order(graph, start):
    visited = set()
    order = []
    queue = deque([start])

    while queue:
        vertex = queue.popleft()

        if vertex not in visited:
            visited.add(vertex)
            order.append(vertex)

            for neighbour in graph[vertex]:
                if neighbour not in visited:
                    queue.append(neighbour)

    return order


print(bfs_order(graph, "A"))
print()


# ==========================================
# 5. Priority Queue
# ==========================================

tasks = []

heapq.heappush(tasks, (3, "Reply to emails"))
heapq.heappush(tasks, (1, "Fix critical bug"))
heapq.heappush(tasks, (5, "Update documentation"))
heapq.heappush(tasks, (2, "Review pull request"))
heapq.heappush(tasks, (4, "Team meeting"))

print("5. Priority Queue:")
while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Priority {priority}: {task}")
