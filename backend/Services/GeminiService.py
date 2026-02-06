import json

from dotenv import load_dotenv
from google import genai
from Models.GeminiResponse import GeminiResponse

load_dotenv()


class GeminiService:
    """Gemini Service to send the prompt to Gemini, and get the answer as well as the form of the graph
    This is going to be the return format of the API {
       "final_answer": string,
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
     }
    """

    def __init__(self) -> None:
        self.query = None
        self.prompt = None
        self.answer = None
        self.context = []

        self.client = genai.Client()

    def constructPrompt(self, query: str) -> None:
        s_prompt = """Solve the given problem and provide a concise reasoning summary.

        IMPORTANT CONSTRAINTS:
        - Do NOT reveal internal hidden chain-of-thought or model deliberations.
        - Provide a high-level, human-readable reasoning summary only.
        - Explanations must be abstracted and justifiable.

        OUTPUT FORMAT (STRICT — JSON ONLY):

        {{
          "final_answer": string,
          "reasoning_graph": {{
            "nodes": [
              {{
                "id": "S1",
                "title": string,
                "description": string,
                "type": "assumption | inference | calculation | decision | conclusion"
              }}
            ],
            "edges": [
              {{
                "from": "S1",
                "to": "S2",
                "relation": "depends_on | leads_to | supports | verifies"
              }}
            ],
            "adjacency_matrix": {{
              "node_order": ["S1", "S2", "S3"],
              "matrix": [
                [0, 1, 0],
                [0, 0, 1],
                [0, 0, 0]
              ]
            }}
          }},
          "assumptions": [string],
          "confidence_notes": string
        }}

        RULES:
        - Each node must represent one logical step a human could justify.
        - IDs must be sequential (S1, S2, S3, …).
        - The adjacency matrix must correctly reflect the directed edges.
        - No prose outside JSON.
        - Be deterministic and consistent.

        PROBLEM:{problem}"""
        self.prompt = s_prompt.format(problem=query)
        if not self.prompt:
            print("There was an error in construction of the prompt")

    def GetAnswer(self) -> GeminiResponse:
        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=self.prompt,
        )
        if response.text is None:
            raise ValueError("API response text is None")

        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        elif response_text.startswith("```"):
            response_text = response_text[3:]

        if response_text.endswith("```"):
            response_text = response_text[:-3]

        response_text = response_text.strip()

        try:
            data = json.loads(response_text)
            self.parsed = GeminiResponse.model_validate(data)
            self.context.append(self.answer)
            return self.parsed
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON: {e}")
            print(f"Raw response: {response.text[:500]}...")
            print(f"Cleaned response: {response_text[:500]}...")
            raise ValueError(f"{e}: There was a problem in parsing the JSON file")

    def invoke(self, query: str) -> GeminiResponse:
        self.constructPrompt(query)
        answer = self.GetAnswer()
        return answer
