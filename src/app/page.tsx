"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React, { Suspense, useState } from 'react'
import { toast } from 'sonner'


const page =() => {
  const [value,setValue]=useState("")
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Job invoked successfully")
    }
  }))
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Input className='border-3 border-gray-800' value={value} onChange={(e)=>setValue(e.target.value)}/>
      <Button onClick={()=>invoke.mutate({value:value})}>
        Invoke background Job
      </Button>
    </div>
  )
}

export default page