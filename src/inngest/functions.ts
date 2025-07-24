import { inngest } from "./client";
import {Sandbox} from "@e2b/code-interpreter";
import { Agent, openai, createAgent, gemini } from "@inngest/agent-kit";
import { getsandboxUrl } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {
    const sandboxId=await step.run('get-sandbox-Id',async()=>{
      const sandbox=await Sandbox.create('creator-nextjs-t-2')
      return sandbox.sandboxId
    })

      const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.You write readable, maintainable code. You write simple next.js and react snippets.",
      model: gemini({ model: "gemini-1.5-flash" }),
    });

    const {output}=await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );

    const sandboxUrl=await step.run('get-sandbox-url',async ()=>{
      const sandbox=await getsandboxUrl(sandboxId)
      return `https://${sandbox.getHost(3000)}`;
    })



    return { output,sandboxUrl};
  },
);