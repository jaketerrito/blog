
class PostNotFoundError(Exception):
    @staticmethod
    def get_message(id: str):
        return f"Post {id} not found"

    def __init__(self, id: str):
        self.id = id
        super().__init__(self.get_message(id))
