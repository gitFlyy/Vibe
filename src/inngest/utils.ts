import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage, Message } from "@inngest/agent-kit"

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

// Accept either an AgentResult directly or an object containing `{ result: AgentResult }`
// (e.g. the value returned by `network.run()`), and safely extract the text from the
// last assistant message.
export function lastAssistantTextMessageContent(arg: unknown) {
  // Handle either an AgentResult or an object with a `result: AgentResult` property.
  const maybe: any = arg as any;
  const res: AgentResult | undefined = maybe?.output
    ? (maybe as AgentResult)
    : maybe?.result?.output
      ? (maybe.result as AgentResult)
      : undefined;

  if (!res) return undefined;

  const lastAssistantTextMessageIndex = res.output.findLastIndex(
    (message) => message.role === "assistant",
  );

  const message = res.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

export const parseAgentOutput = (value: Message[]) => {
  const output = value[0];

  if (output.type !== "text") {
    return "Fragment";
  }

  if(Array.isArray(output.content)) {
    return output.content.map((txt) => txt).join("");
  } else {
    return output.content;
  }
}