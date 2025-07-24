import  { Sandbox } from "@e2b/code-interpreter";

export const getsandboxUrl=async (sandboxId: string)=>{
    const sandbox=await Sandbox.connect(sandboxId)
    return sandbox
}
