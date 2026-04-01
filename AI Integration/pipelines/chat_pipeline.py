def build_chat_payload(conversation: list[dict], financial_context: dict) -> dict:
    # TODO: Build normalized payload for model inference.
    return {
        "conversation": conversation,
        "financial_context": financial_context,
    }
