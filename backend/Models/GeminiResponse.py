from typing import List

from pydantic import BaseModel, Field

"""final_answer": string,
       "reasoning_graph": {
         "nodes": [
           {
             "id": "S1",
             "title": string,
             "description": string,
             "type": "assumption | inference | calculation | decision | conclusion"
           }
         ],
         "edges": [
           {
             "from": "S1",
             "to": "S2",
             "relation": "depends_on | leads_to | supports | verifies"
           }
         ],
         "adjacency_matrix": {
           "node_order": ["S1", "S2", "S3"],
           "matrix": [
             [0, 1, 0],
             [0, 0, 1],
             [0, 0, 0]
           ]
         }
       },
       "assumptions": [string],
       "confidence_notes": string
     }"""


class Node(BaseModel):
    id: str
    title: str
    description: str
    type: str


class Edge(BaseModel):
    from_: str = Field(..., alias="from")
    to: str
    relation: str


class AdjacencyMatrix(BaseModel):
    node_order: List[str]
    matrix: List[List[int]]


class Graph(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    adjacency_matrix: AdjacencyMatrix


class GeminiResponse(BaseModel):
    final_answer: str
    reasoning_graph: Graph
    assumptions: List[str]
    confidence_notes: str
